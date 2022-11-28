import * as path from 'path';
import { loadConfigFromFile, mergeConfig } from 'vite';
import type {
  ConfigEnv,
  InlineConfig as ViteInlineConfig,
  PluginOption,
  UserConfig as ViteConfig,
  InlineConfig,
} from 'vite';
import viteReact from '@vitejs/plugin-react';
import externalGlobals from 'rollup-plugin-external-globals';
import { isPreservingSymlinks, getFrameworkName } from '@storybook/core-common';
import { globals } from '@storybook/preview/globals';
import {
  codeGeneratorPlugin,
  injectExportOrderPlugin,
  mdxPlugin,
  stripStoryHMRBoundary,
} from './plugins';
import type { ExtendedOptions } from './types';

export type PluginConfigType = 'build' | 'development';

const configEnvServe: ConfigEnv = {
  mode: 'development',
  command: 'serve',
  ssrBuild: false,
};

const configEnvBuild: ConfigEnv = {
  mode: 'production',
  command: 'build',
  ssrBuild: false,
};

// Vite config that is common to development and production mode
export async function commonConfig(
  options: ExtendedOptions,
  _type: PluginConfigType
): Promise<ViteInlineConfig> {
  const configEnv = _type === 'development' ? configEnvServe : configEnvBuild;

  // I destructure away the `build` property from the user's config object
  // I do this because I can contain config that breaks storybook, such as we had in a lit project.
  // If the user needs to configure the `build` they need to do so in the viteFinal function in main.js.
  const { config: { build: buildProperty = undefined, ...userConfig } = {} } =
    (await loadConfigFromFile(configEnv)) ?? {};

  const sbConfig: InlineConfig = {
    configFile: false,
    cacheDir: 'node_modules/.cache/.vite-storybook',
    root: path.resolve(options.configDir, '..'),
    // Allow storybook deployed as subfolder.  See https://github.com/storybookjs/builder-vite/issues/238
    base: './',
    plugins: await pluginConfig(options),
    resolve: {
      preserveSymlinks: isPreservingSymlinks(),
      alias: {
        assert: require.resolve('browser-assert'),
      },
    },
    // If an envPrefix is specified in the vite config, add STORYBOOK_ to it,
    // otherwise, add VITE_ and STORYBOOK_ so that vite doesn't lose its default.
    envPrefix: userConfig.envPrefix ? 'STORYBOOK_' : ['VITE_', 'STORYBOOK_'],
  };

  const config: ViteConfig = mergeConfig(userConfig, sbConfig);

  return config;
}

export async function pluginConfig(options: ExtendedOptions) {
  const frameworkName = await getFrameworkName(options);

  const plugins = [
    codeGeneratorPlugin(options),
    // sourceLoaderPlugin(options),
    mdxPlugin(),
    injectExportOrderPlugin,
    stripStoryHMRBoundary(),
    {
      name: 'storybook:allow-storybook-dir',
      enforce: 'post',
      config(config) {
        // if there is NO allow list then Vite allows anything in the root directory
        // if there is an allow list then Vite only allows anything in the listed directories
        // add storybook specific directories only if there's an allow list so that we don't end up
        // disallowing the root unless root is already disallowed
        if (config?.server?.fs?.allow) {
          config.server.fs.allow.push('.storybook');
        }
      },
    },
    externalGlobals(globals),
  ] as PluginOption[];

  // We need the react plugin here to support MDX in non-react projects.
  if (frameworkName !== '@storybook/react-vite') {
    plugins.push(viteReact({ exclude: [/\.stories\.([tj])sx?$/, /node_modules/, /\.([tj])sx?$/] }));
  }

  // TODO: framework doesn't exist, should move into framework when/if built
  if (frameworkName === '@storybook/preact-vite') {
    // eslint-disable-next-line global-require
    plugins.push(require('@preact/preset-vite').default());
  }

  // TODO: framework doesn't exist, should move into framework when/if built
  if (frameworkName === '@storybook/glimmerx-vite') {
    // eslint-disable-next-line global-require, import/extensions
    const plugin = require('vite-plugin-glimmerx/index.cjs');
    plugins.push(plugin.default());
  }

  return plugins;
}

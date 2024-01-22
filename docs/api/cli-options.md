---
title: 'CLI options'
---

The Storybook command line interface (CLI) is the main tool you use to build and develop Storybook.

<Callout variant="info">

Storybook collects completely anonymous data to help us improve user experience. Participation is optional, and you may [opt-out](../configure/telemetry.md#how-to-opt-out) if you'd not like to share any information.

</Callout>

## API commands

All of the following documentation is available in the CLI by running `storybook --help`.

<Callout variant="info" icon="💡">

Passing options to these commands works slightly differently if you're using npm instead of Yarn. You must prefix all of your options with `--`. For example, `npm run storybook build -- -o ./path/to/build --quiet`.

</Callout>

### `dev`

Compiles and serves a development build of your Storybook that reflects your source code changes in the browser in real-time. It should be run from the root of your project.

```shell
storybook dev [options]
```

Options include:

| Option                          | Description                                                                                                                                                               |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--help`                        | Output usage information <br/>`storybook dev --help`                                                                                                                      |
| `-V`, `--version`               | Output the version number <br/>`storybook dev -V`                                                                                                                         |
| `-p`, `--port [number]`         | Port to run Storybook <br/>`storybook dev -p 9009`                                                                                                                        |
| `-h`, `--host [string]`         | Host to run Storybook <br/>`storybook dev -h my-host.com`                                                                                                                 |
| `-c`, `--config-dir [dir-name]` | Directory where to load Storybook configurations from <br/>`storybook dev -c .storybook`                                                                                  |
| `--https`                       | Serve Storybook over HTTPS. Note: You must provide your own certificate information<br/>`storybook dev --https`                                                           |
| `--ssl-ca`                      | Provide an SSL certificate authority. (Optional with --https, required if using a self-signed certificate)<br/>`storybook dev --ssl-ca my-certificate`                    |
| `--ssl-cert`                    | Provide an SSL certificate. (Required with --https)<br/>`storybook dev --ssl-cert my-ssl-certificate`                                                                     |
| `--ssl-key`                     | Provide an SSL key. (Required with --https)<br/>`storybook dev --ssl-key my-ssl-key`                                                                                      |
| `--smoke-test`                  | Exit after successful start<br/>`storybook dev --smoke-test`                                                                                                              |
| `--ci`                          | CI mode (skip interactive prompts, don't open browser)<br/>`storybook dev --ci`                                                                                           |
| `--no-open`                     | Do not open Storybook automatically in the browser<br/>`storybook dev --no-open`                                                                                          |
| `--quiet`                       | Suppress verbose build output<br/>`storybook dev --quiet`                                                                                                                 |
| `--debug-webpack`               | Display final webpack configurations for debugging purposes<br/>`storybook dev --debug-webpack`                                                                           |
| `--webpack-stats-json`          | Write Webpack Stats JSON to disk<br/>`storybook dev --webpack-stats-json /tmp/webpack-stats`                                                                              |
| `--docs`                        | Starts Storybook in documentation mode. Learn more about it in [here](../writing-docs/build-documentation.md#preview-storybooks-documentation)<br/>`storybook dev --docs` |
| `--disable-telemetry`           | Disables Storybook's telemetry. Learn more about it [here](../configure/telemetry.md)<br/>`storybook dev --disable-telemetry`                                             |

<Callout variant="warning" id="static-dir-deprecation">

With the release of Storybook 8, the `-s` CLI flag was removed. We recommend using the [static directory](../configure/images-and-assets.md#serving-static-files-via-storybook) instead if you need to serve static files.

</Callout>

### `build`

Compiles your Storybook instance so it can be [deployed](../sharing/publish-storybook.md). It should be run from the root of your project.

```shell
storybook build [options]
```

Options include:

| Option                          | Description                                                                                                                                                                                           |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-h`, `--help`                  | Output usage information<br/>`storybook build --help`                                                                                                                                                 |
| `-V`, `--version`               | Output the version number<br/>`storybook build -V`                                                                                                                                                    |
| `-o`, `--output-dir [dir-name]` | Directory where to store built files<br/>`storybook build -o /my-deployed-storybook`                                                                                                                  |
| `-c`, `--config-dir [dir-name]` | Directory where to load Storybook configurations from<br/>`storybook build -c .storybook`                                                                                                             |
| `--loglevel [level]`            | Controls level of logging during build.<br/> Available options: `silly`, `verbose`, `info` (default), `warn`, `error`, `silent`<br/>`storybook build --loglevel warn`                                 |
| `--quiet`                       | Suppress verbose build output<br/>`storybook build --quiet`                                                                                                                                           |
| `--debug-webpack`               | Display final webpack configurations for debugging purposes<br/>`storybook build --debug-webpack`                                                                                                     |
| `--webpack-stats-json`          | Write Webpack Stats JSON to disk<br/>`storybook build --webpack-stats-json /my-storybook/webpack-stats`                                                                                               |
| `--docs`                        | Builds Storybook in documentation mode. Learn more about it in [here](../writing-docs/build-documentation.md#publish-storybooks-documentation)<br/>`storybook build --docs`                           |
| `--disable-telemetry`           | Disables Storybook's telemetry. Learn more about it [here](../configure/telemetry.md).<br/>`storybook build --disable-telemetry`                                                                      |
| `--test`                        | Optimize Storybook's production build for performance and tests by removing unnecessary features with the `test` option. Learn more [here](../api/main-config-build.md).<br/>`storybook build --test` |

<!-- Re-read this for accuracy -->

### `init`

Installs and initializes the specified version (e.g., `@latest`, `@8`, `@next`) of Storybook into your project. Read more in the [installation guide](../get-started/install.md).

```shell
storybook[@version] init [options]
```

For example, `storybook@latest init` will install the latest version of Storybook into your project.

Options include:

| Option                 | Description                                                                                                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `-b`, `--builder`      | Defines the [builder](../builders/index.md) to use for your Storybook instance<br/>`storybook init --builder webpack5`                                                         |
| `-f`,`--force`         | Forcefully installs Storybook into your project, prompting you to overwrite existing files<br/>`storybook init --force`                                                        |
| `-s`, `--skip-install` | Skips the dependency installation step. Used only when you need to configure Storybook manually<br/>`storybook init --skip-install`                                            |
| `-t`, `--type`         | Defines the [framework](../configure/frameworks.md) to use for your Storybook instance<br/>`storybook init --type solid`                                                       |
| `-y`, `--yes`          | Skips interactive prompts and automatically installs Storybook per specified version<br/>`storybook init --yes`                                                                |
| `--package-manager`    | Sets the package manager to use when installing the addon.<br/> Available package managers include `npm`, `yarn`, and `pnpm`<br/>`storybook init --package-manager pnpm`       |
| `--use-pnp`            | Enables [Plug'n'Play](https://yarnpkg.com/features/pnp) support for Yarn. This option is only available when using Yarn as your package manager<br/>`storybook init --use-pnp` |

### `add`

Installs a Storybook addon and configures your project for it. Read more in the [addon installation guide](../addons/install-addons.md).

```shell
storybook add [addon] [options]
```

Options include:

| Option                     | Description                                                                                                                                                                     |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--package-manager`        | Sets the package manager to use when installing the addon.<br/> Available package managers include `npm`, `yarn`, and `pnpm`<br/>`storybook add [addon] --package-manager pnpm` |
| `-s`, `--skip-postinstall` | Skips post-install configuration. Used only when you need to configure the addon yourself<br/>`storybook add [addon] --skip-postinstall`                                        |

### `remove`

Deletes a Storybook addon from your project. Read more in the [addon installation guide](../addons/install-addons.md#removing-addons).

```shell
storybook remove [addon] [options]
```

Options include:

| Option              | Description                                                                                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--package-manager` | Sets the package manager to use when removing the addon.<br/>Available package managers include `npm`, `yarn`, and `pnpm`<br/>`storybook remove  [addon]--package-manager pnpm` |

### `upgrade`

Upgrades your Storybook instance to the specified version (e.g., `@latest`, `@8`, `@next`). Read more in the [upgrade guide](../configure/upgrading.md).

```shell
storybook[@version] upgrade [options]
```

For example, `storybook@latest upgrade --dry-run` will perform a dry run (no actual changes) of upgrading your project to the latest version of Storybook.

Options include:

| Option               | Description                                                                                                                                                                 |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-c`, `--config-dir` | Directory where to load Storybook configurations from<br/>`storybook upgrade --config-dir .storybook`                                                                       |
| `-n`, `--dry-run`    | Checks for version upgrades without installing them<br/>`storybook upgrade --dry-run`                                                                                       |
| `-s`, `--skip-check` | Skips the migration check step during the upgrade process<br/> `storybook upgrade --skip-check`                                                                             |
| `-y`, `--yes`        | Skips interactive prompts and automatically upgrades Storybook to the latest version<br/>`storybook upgrade --yes`                                                          |
| `--package-manager`  | Sets the package manager to use when installing the addon.<br/> Available package managers include `npm`, `yarn`, and `pnpm`<br/>`storybook upgrade --package-manager pnpm` |

### `doctor`

Performs a health check on your Storybook project for common issues (e.g., duplicate dependencies, incompatible addons or mismatched versions) and provides suggestions on how to fix them. Applicable when [upgrading](../configure/upgrading.md#verifying-the-upgrade) Storybook versions.

```shell
storybook doctor [options]
```

Options include:

| Option               | Description                                                                                                                                                                   |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-c`, `--config-dir` | Directory where to load Storybook configurations from<br/>`storybook doctor --config-dir .storybook`                                                                          |
| `--package-manager`  | Sets the package manager to use when running the health check.<br/>Available package managers include `npm`, `yarn`, and `pnpm`<br/>`storybook doctor --package-manager pnpm` |

### `info`

Reports useful debugging information about your environment. Helpful in providing information when opening an issue or a discussion.

```shell
storybook info
```

Example output:

```shell
Storybook Environment Info:

  System:
    OS: macOS 14.2
    CPU: (8) arm64 Apple M3
    Shell: 5.9 - /bin/zsh
  Binaries:
    Node: 18.19.0 - ~/.nvm/versions/node/v18.19.0/bin/node
    npm: 10.2.3 - ~/.nvm/versions/node/v18.19.0/bin/npm <----- active
  Browsers:
    Chrome: 120.0.6099.199
  npmPackages:
    @storybook/addon-essentials: ^7.6.6 => 7.6.6
    @storybook/addon-interactions: ^7.6.6 => 7.6.6
    @storybook/addon-links: ^7.6.6 => 7.6.6
    @storybook/addon-onboarding: ^1.0.10 => 1.0.10
    @storybook/blocks: ^7.6.6 => 7.6.6
    @storybook/preset-create-react-app: ^7.6.6 => 7.6.6
    @storybook/react: ^7.6.6 => 7.6.6
    @storybook/react-webpack5: ^7.6.6 => 7.6.6
    @storybook/test: ^7.6.6 => 7.6.6
    storybook: ^7.6.6 => 7.6.6
  npmGlobalPackages:
    chromatic: ^10.2.0 => 10.2.0
```

### `sandbox`

Generates a local sandbox project using the specified version (e.g., `@latest`, `@8`, `@next`) for testing Storybook features based on the list of supported [frameworks](../configure/frameworks.md). Useful for reproducing bugs when opening an issue or a discussion.

```shell
storybook[@version] sandbox [framework-filter] [options]
```

For example, `storybook@next sandbox` will generated sandboxes using the newest pre-release version of Storybook.

The `framework-filter` argument is optional and can filter the list of available frameworks. For example, `storybook@next sandbox react` will only offer to generate React-based sandboxes.

Options include:

| Option                      | Description                                                                                          |
| --------------------------- | ---------------------------------------------------------------------------------------------------- |
| `-o`, `--output [dir-name]` | Configures the location of the sandbox project<br/>`storybook sandbox --output /my-sandbox-project`  |
| `--no-init`                 | Generates a sandbox project without without initializing Storybook<br/>`storybook sandbox --no-init` |

<Callout variant="info">

If you're looking for a hosted version of the available sandboxes, see [storybook.new](https://storybook.new).

</Callout>

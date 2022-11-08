import type { ArgsStoryFn, Framework, StoryContext as DefaultStoryContext } from '@storybook/types';

import type { parameters } from './config';

export type { RenderContext } from '@storybook/types';

export type StoryFnHtmlReturnType = string | Node;

export interface ShowErrorArgs {
  title: string;
  description: string;
}

export interface HtmlFramework extends Framework {
  component: string | HTMLElement | ArgsStoryFn<HtmlFramework>;
  storyResult: StoryFnHtmlReturnType;
}

export type StoryContext = DefaultStoryContext<HtmlFramework> & {
  parameters: DefaultStoryContext<HtmlFramework>['parameters'] & typeof parameters;
};

# Storybook README

## Installation

Followed the instructions in the official [Storybook documentation for React Native Web](https://storybook.js.org/docs/get-started/frameworks/react-native-web-vite#in-a-project-without-storybook?renderer=react-native-web).

```bash
npm create storybook@latest
```

## Configuration

Since our project is originally a React Native project, we diverged from the official documentation a bit to make it work with Storybook and React Native Web.

### 1. Install the extra necessary dependencies

```bash
npm install --save-dev @storybook/react-native-web-vite react-native-web vite
```

### 2. Make the following changes in `.storybook/main.ts`

```diff
- import type { StorybookConfig } from '@storybook/react-vite';
+ import type { StorybookConfig } from '@storybook/react-native-web-vite';
```

```diff
  "stories": [
-   "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ]
```

```diff
  "framework": {
-    "name": "@storybook/react-vite",
+    "name": "@storybook/react-native-web-vite",
    "options": {}
  }
```

### 3. Remove the demo stories

<!--
  Below notation only works in GitHub markdown.
  https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts
-->

> [!CAUTION]
> Don't use ``-rf`` in the command below. It will delete the required assets for Storybook.

```bash
rm src/stories/*
```

## Creating Stories

The instructions on how to create stories are the same as the official documentation. You can find them [here](https://storybook.js.org/docs/writing-stories?renderer=react-native-web). Make sure the renderer is selected as `React Native Web` on the Storybook documentation.

## Compatibility Resources
Compatibility between React Native and React Native Web is a bit tricky for some native components. Below are some resources that can help you understand the compatibility between the two.

- [Storybook for React Native vs React Native Web](https://storybook.js.org/docs/get-started/frameworks/react-native-web-vite#react-native-vs-react-native-web)
- [React Native / React Native Web compatibility](https://necolas.github.io/react-native-web/docs/react-native-compatibility/)

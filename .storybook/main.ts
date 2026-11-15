import type { StorybookConfig } from '@storybook/react-vite';
import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';

/**
 * 프로젝트의 vite.config.ts(Tailwind · SVGR)를 그대로 사용해요.
 * `@/` 절대경로는 .storybook 폴더에서도 쓸 수 있게 별칭을 추가해요.
 * 스토리 파일은 컴포넌트 옆에 `컴포넌트명.stories.tsx`로 둬요.
 */
const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: '@storybook/react-vite',
  viteFinal: (viteConfig) =>
    mergeConfig(viteConfig, {
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('../src', import.meta.url)),
        },
      },
    }),
};

export default config;

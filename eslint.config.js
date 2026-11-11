import { defineConfig, globalIgnores } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import storybook from 'eslint-plugin-storybook';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['dist', 'storybook-static']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    rules: {
      // 사용하지 않는 import · 변수는 unused-imports가 잡음 (중복 방지)
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // import 순서: React · 외부 라이브러리 → @/ 내부 모듈 → ./ → 스타일 · 에셋
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react$', '^react-dom', '^react', '^@?\\w'],
            ['^@/'],
            ['^\\.'],
            ['^\\u0000', '\\.(css|svg|png|jpe?g|gif|webp|avif)(\\?.*)?$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',

      // ../ 상대경로 대신 @/ 절대경로 사용 (같은 폴더 ./ 는 허용)
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: '^\\.\\.(/|$)',
              message: "'../' 대신 '@/' 절대경로로 import 해 주세요.",
            },
          ],
        },
      ],
    },
  },
  prettierConfig,
  ...storybook.configs['flat/recommended'],
]);

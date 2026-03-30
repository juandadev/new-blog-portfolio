import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import jshintA11y from 'eslint-plugin-jsx-a11y';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  jshintA11y.flatConfigs.recommended,
  prettierRecommended,
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'src/components/animations/**',
    'src/components/backgrounds/**',
  ]),
]);

export default eslintConfig;

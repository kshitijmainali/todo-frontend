import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginJSXA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginTypescriptESLint from '@typescript-eslint/eslint-plugin';
import eslintParserTypescript from '@typescript-eslint/parser'; // Import the parser
import eslintPluginTanstackQuery from '@tanstack/eslint-plugin-query';

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: eslintParserTypescript,
      parserOptions: {
        jsx: true,
      },
      globals: {
        browser: true,
        node: true,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      react: eslintPluginReact,
      prettier: eslintPluginPrettier,
      'jsx-a11y': eslintPluginJSXA11y,
      import: eslintPluginImport,
      '@typescript-eslint': eslintPluginTypescriptESLint,
      '@tanstack/query': eslintPluginTanstackQuery,
    },
    rules: {
      'no-console': 'off',
      'import/first': 'error',
      'react/prop-types': 'off',
      'linebreak-style': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'prettier/prettier': 'warn',
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      'no-useless-catch': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@tanstack/query/prefer-query-object-syntax': 'error',
    },
  },
];

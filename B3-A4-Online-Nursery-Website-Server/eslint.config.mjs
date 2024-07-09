import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';

export default [
  {
    rules: {
      'no-unused-vars': 'error',
      'no-unused-expressions': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      'no-undef': 'error',
    },

    languageOptions: { globals: globals.browser },
  },

  pluginJs.configs.recommended,
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
];

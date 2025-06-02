// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import checkFile from 'eslint-plugin-check-file';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    plugins: {
      'check-file': checkFile,
    },
    rules: {
      // Start check file rules
      'check-file/no-index': 'error',
      'check-file/filename-blocklist': [
        'error',
        {
          '**/*.model.ts': '*.models.ts',
          '**/*.util.ts': '*.utils.ts',
        },
      ],
      'check-file/folder-match-with-fex': [
        'error',
        {
          '*.test.{js,jsx,ts,tsx}': '**/__tests__/',
          '*.styled.{jsx,tsx}': '**/components/',
        },
      ],
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.{jsx,tsx}': 'KEBAB_CASE',
          '**/*.{js,ts,service.spec.ts}': 'KEBAB_CASE',
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
      'check-file/folder-naming-convention': [
        'error',
        {
          'src/components/*/': 'KEBAB_CASE',
          'src/!(components)/**/!(__tests__)/': 'KEBAB_CASE',
        },
      ],
      // End check file rules
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          filter: {
            match: false,
            regex: '^_',
          },
          format: ['camelCase'],
          selector: 'default',
        },
        {
          format: ['PascalCase'],
          selector: 'class',
        },
        {
          format: ['camelCase'],
          selector: 'function',
        },
        {
          format: ['PascalCase'],
          selector: 'enum',
        },
        {
          format: null,
          selector: 'objectLiteralMethod',
        },
        {
          format: null,
          selector: 'objectLiteralProperty',
        },
        {
          format: ['camelCase'],
          leadingUnderscore: 'allow',
          selector: 'property',
        },
        {
          format: ['camelCase'],
          selector: 'variableLike',
        },
        {
          format: ['PascalCase', 'camelCase'],
          selector: 'import',
        },
        {
          format: [ 'camelCase'],
          selector: 'parameter',
        },
        {
          format: ['PascalCase'],
          selector: 'typeParameter',
        },
        {
          format: ['PascalCase'],
          prefix: ['T'],
          selector: 'typeAlias',
        },
        {
          format: ['PascalCase'],
          prefix: ['I'],
          selector: 'interface',
        },
        {
          format: ['camelCase', 'UPPER_CASE'],
          selector: 'variable',
        },
      ],
    },
  },
);
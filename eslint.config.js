// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    plugins: {
      import: require('eslint-plugin-import'),
    },
    rules: {
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: {
            constructors: 'no-public',
          },
        },
      ],
      'import/no-cycle': ['error', { maxDepth: 1 }],
      'import/no-restricted-paths': [
        'error',
        {
          basePath: __dirname,
          zones: [
            {
              target: './src/app/core',
              from: ['./src/app/features', './src/app/layouts'],
              message:
                'Core must stay independent from feature and layout code.',
            },
            {
              target: './src/app/shared',
              from: ['./src/app/features', './src/app/layouts'],
              message:
                'Shared code must stay independent from feature and layout code.',
            },
            {
              target: './src/app/features',
              from: './src/app/layouts',
              message: 'Features must not depend on layouts.',
            },
            {
              target: './src/app/layouts',
              from: './src/app/features',
              message: 'Layouts must not depend on feature code.',
            },
            {
              target: './src/app/features/home',
              from: './src/app/features',
              except: ['./home'],
              message: 'Feature code must not import another feature directly.',
            },
            {
              target: './src/app/features/about',
              from: './src/app/features',
              except: ['./about'],
              message: 'Feature code must not import another feature directly.',
            },
            {
              target: './src/app/features/schedule',
              from: './src/app/features',
              except: ['./schedule'],
              message: 'Feature code must not import another feature directly.',
            },
            {
              target: './src/app/features/settings',
              from: './src/app/features',
              except: ['./settings'],
              message: 'Feature code must not import another feature directly.',
            },
            {
              target: './src/app/features/static',
              from: './src/app/features',
              except: ['./static'],
              message: 'Feature code must not import another feature directly.',
            },
          ],
        },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: '@angular/**',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '{rxjs,@ngrx/**}',
              group: 'external',
              position: 'after',
            },
            {
              pattern: '@environments/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@config/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@core/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@{app,shared,features}/**',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
        },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'trollysix',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'trollysix',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    plugins: {},
    rules: {},
  },
);

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['airbnb', 'airbnb-typescript', 'airbnb/hooks', 'plugin:@typescript-eslint/recommended'],
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    node: true,
    'jest/globals': true
  },
  plugins: [
    'react-hooks',
    '@typescript-eslint',
    'import',
    'react',
    'cypress',
    'simple-import-sort',
    'dirnames',
    'unicorn',
    'jsx-a11y',
    'react-refresh',
    'jest'
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
      }
    },
    react: {
      version: 'detect'
    }
  },
  rules: {
    quotes: ['warn', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'always', prev: '*', next: 'return' },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var']
      }
    ],
    'no-shadow': 'off',
    'max-lines': ['warn', { max: 124 }],

    //jest
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',

    // Override default airbnb rules
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-negated-condition': 'warn',
    'default-case': 'off',
    'no-use-before-define': 'off',
    'prefer-regex-literals': 'off',
    'implicit-arrow-linebreak': 'off',

    //react-refresh
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

    // code smell detection
    complexity: ['warn', 20],
    'max-nested-callbacks': 'warn',
    'no-restricted-properties': [
      'error',
      {
        object: 'it',
        property: 'only',
        message: "Did you forget to remove 'only' from this test?"
      },
      {
        object: 'describe',
        property: 'only',
        message: "Did you forget to remove 'only' from this test?"
      },
      {
        object: 'context',
        property: 'only',
        message: "Did you forget to remove 'only' from this test?"
      },
      {
        object: 'test',
        property: 'only',
        message: "Did you forget to remove 'only' from this test?"
      }
    ],

    // React

    'react/static-property-placement': ['error', 'static public field'],
    'react/state-in-constructor': ['error', 'never'],
    'react/prop-types': 'off',
    'react/sort-comp': 'off',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-boolean-value': ['error', 'always'],
    'react/jsx-props-no-spreading': 'off',
    'react/prefer-stateless-function': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
    'react/jsx-one-expression-per-line': 'off',
    'react/function-component-definition': ['warn', { namedComponents: 'arrow-function' }],
    'comma-dangle': 'off',

    // A11Y
    'jsx-a11y/anchor-is-valid': ['warn', { aspects: ['invalidHref'] }],
    'jsx-a11y/label-has-associated-control': [
      'error',
      { labelComponents: ['label'], assert: 'either' }
    ],

    // typescript
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/array-type': [
      'error',
      { default: 'array-simple', readonly: 'array-simple' }
    ],
    '@typescript-eslint/consistent-type-assertions': 'warn',
    '@typescript-eslint/no-array-constructor': 'error',
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-shadow': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true }
    ],
    '@typescript-eslint/default-param-last': 'off',

    // Imports, file extensions
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.{stories,test,tests,spec}.{js,jsx,ts,tsx}'] }
    ],
    'import/no-cycle': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-useless-path-segments': [
      'error',
      {
        noUselessIndex: true
      }
    ],
    'dirnames/match-kebab-case': 'error',
    'unicorn/filename-case': [
      'error',
      {
        case: 'pascalCase',
        ignore: ['firebase.*$', 'store.ts', '^use[A-Z0-9].*$', '^routes.*$', 'hooks']
      }
    ],
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          // Node.js builtins. You could also generate this regex if you use a `.js` config.
          // For example: `^(${require("module").builtinModules.join("|")})(/|$)`
          [
            '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)'
          ],
          // Packages. `react` related packages come first.
          ['^react', '^redux', '^@?\\w'],
          // Components.
          ['@alfalab/*', '^arui-(feather|private)(/?.*|$)'],
          // Root path for project
          ['^#'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
          ['^.+\\.s?css$']
        ]
      }
    ],
    'import/no-import-module-exports': 'off',
    'no-restricted-imports': [
      'error',
      {
        name: 'lodash',
        message:
          'Please use single imports of lodash functions, e.g `import isEqual from "lodash/isEqual"` instead of `"import { isEqual } from "lodash"`'
      }
    ],
    'object-curly-newline': [
      'error',
      {
        ImportDeclaration: 'never'
      }
    ]
  },
  overrides: [
    {
      files: ['*.{test,tests,spec}.{js,jsx,ts,tsx}'],
      env: {
        node: true,
        jest: true,
        browser: true
      }
    },
    {
      files: ['**/cypress/**/*'],
      env: {
        'cypress/globals': true
      },
      rules: {
        'cypress/no-assigning-return-values': 'error',
        'cypress/no-unnecessary-waiting': 'error'
      }
    }
  ]
};

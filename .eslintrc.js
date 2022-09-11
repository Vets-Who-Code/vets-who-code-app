module.exports = {
  parser: '@babel/eslint-parser',
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'next/core-web-vitals',
    'plugin:storybook/recommended',
  ],
  parserOptions: {
    requireConfigFile: false,
    ecmaFeatures: {
      jsx: true,
    },
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['prettier', 'react-hooks'],
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-useless-catch': 'off',
    'no-undef': 'off',
    'no-debugger': 'off',
    eqeqeq: ['error', 'always'],
    'getter-return': [
      'error',
      {
        allowImplicit: true,
      },
    ],
    'no-template-curly-in-string': 'error',
    semi: 'off',
    'array-bracket-spacing': ['error', 'never'],
    'block-spacing': ['error', 'always'],
    'brace-style': [
      'error',
      '1tbs',
      {
        allowSingleLine: true,
      },
    ],
    camelcase: 'warn',
    'comma-dangle': 'off',
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true,
      },
    ],
    'comma-style': ['error', 'last'],
    'computed-property-spacing': ['error', 'never'],
    'func-call-spacing': ['error', 'never'],
    'keyword-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
      },
    ],
    'no-duplicate-imports': 'error',
    'id-length': 'off',
    'id-blacklist': 0,
    'max-depth': ['warn', 4],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
}

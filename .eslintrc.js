module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-typescript',
    'prettier',
    'plugin:sonarjs/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'sonarjs', 'prettier'],
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    // suppress errors for missing 'import React' in files
    'react/react-in-jsx-scope': 'off',
    // allow jsx syntax in js files (for next.js project). should add ".ts" if typescript project
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};

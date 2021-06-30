module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'standard',
    'standard-jsx',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    describe: 'readonly',
    it: 'readonly',
    expect: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'standard',
  ],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    'import/first': 'off',
    'no-trailing-spaces': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'react/jsx-closing-bracket-location': [1, 'line-aligned'],
    '@typescript-eslint/explicit-function-return-type': ['off'],
    '@typescript-eslint/no-var-requires': ['off'],
    '@typescript-eslint/member-delimiter-style': ['error', {
      multiline: {
        delimiter: 'none',
        requireLast: true,
      },
      singleline: {
        delimiter: 'comma',
        requireLast: false,
      },
    }],
  },
}

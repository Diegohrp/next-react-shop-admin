module.exports = {
  root: true,
  env: {
    browser: true,
    amd: true,
    node: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'next',
    'next/core-web-vitals',
  ],
  rules: {
    semi: ['error', 'always'],
    '@next/next/no-html-link-for-pages': 0,
    '@next/next/no-img-element': 0,
    'no-unused-vars': 0,
  },
};

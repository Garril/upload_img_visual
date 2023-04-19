module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    // "eslint:recommended",
    // "plugin:vue/essential", -- 对SFC的特别的配置（不支持vue3的，支持vue2的版本） 改为vue3-recommended
    // "plugin:@typescript-eslint/recommended"
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended' // 整合prettier
  ],
  overrides: [],
  // "parser": "@typescript-eslint/parser",
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    jsx: true,
    tsx: true
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off'
  }
}

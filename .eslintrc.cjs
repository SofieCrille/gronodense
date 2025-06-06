// .eslintrc.cjs
module.exports = {
  root: true,
  env: {
    browser: true,
    node:    true,
    es2021:  true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType:  'module',
    parser:      '@typescript-eslint/parser',
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
  ],
  rules: {
    'no-console':                         process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger':                        process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'vue/no-deprecated-slot-attribute':   'off',
    'vue/valid-v-slot':                   'off',
  },
}

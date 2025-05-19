// .eslintrc.cjs
module.exports = {
  root: true,
  env: {
    browser: true,
    node:    true,
    es2021:  true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType:  'module'
  },
  rules: {
    // console/debugger are warnings in production, off during dev
    'no-console':  process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    // allow `any` in TS
    '@typescript-eslint/no-explicit-any': 'off'
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        // disable deprecated slot attribute check in .vue SFCs
        'vue/no-deprecated-slot-attribute': 'off'
      }
    }
  ]
};

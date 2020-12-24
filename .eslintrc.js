module.exports = {
  root: true,
  // parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  plugins: [
    'html',
    'vue',
    'standard'
  ],
  rules: {
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'indent': 0,
    'no-tabs': 0,
    'space-before-function-paren': 0,
    'semi': [2, 'always'],
    'eol-last': 0,
    'no-undef': 0,
    'no-unused-vars': 0,
    'prefer-const': 0
  }
};

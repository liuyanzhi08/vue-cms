// refer: https://github.com/airbnb/javascript
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    mocha: true,
    jquery: true,
  },
  extends: [
    'airbnb-base',
    'plugin:vue/recommended',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'script/dev.webpack.config.babel.js'
      },
    }
  },
  rules: {
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never',
      json: 'never',
    }],
    'import/no-extraneous-dependencies': ['error', {
        devDependencies: true,
    }],
    'import/prefer-default-export': ['off'],
    'no-underscore-dangle': ['error', {
        allow: ['_page', '_num', '_from', '_size'],
    }],
    'no-param-reassign': ['error', {
        props: false,
    }],
  },
  plugins: [
    'vue',
  ],
}

// refer: https://github.com/airbnb/javascript
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    mocha: true,
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
        config: 'scripts/dev.webpack.conf.babel.js'
      }
    }
  },
  rules: {
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never',
    }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true
      }
    ]
  },
  plugins: [
    'vue',
  ],
}

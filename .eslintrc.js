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
        config: 'scripts/dev.webpack.config.babel.js'
      },
    }
  },
  rules: {
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never',
    }],
    'import/no-extraneous-dependencies': ['error', {
        devDependencies: true,
      }
    ],
    'no-underscore-dangle': ['error', {
        allow: ['_page', '_num', '_from', '_size'],
      }
    ]
  },
  plugins: [
    'vue',
  ],
}

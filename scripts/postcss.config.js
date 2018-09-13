const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    postcssPresetEnv({
      autoprefixer: {
        browsers: ['> 1%', 'last 2 versions'],
      },
    }),
  ],
};

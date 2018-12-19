import path from 'path';
import webpack from 'webpack';
import VueLoaderPlugin from 'vue-loader/lib/plugin';
import config from '../../src/server/config';

const { root } = config.dir;

export default {
  watchOptions: {
    ignored: /node_modules/,
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@npm': path.join(root, 'node_modules'),
      '@image': path.join(root, 'src/client/asset/image'),
      '@style': path.join(root, 'src/client/asset/style'),
    },
    extensions: ['.js', '.vue', '.json'],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new VueLoaderPlugin(),
  ],
};

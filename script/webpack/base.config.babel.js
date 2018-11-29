import path from 'path';
import webpack from 'webpack';
import VueLoaderPlugin from 'vue-loader/lib/plugin';
import config from '../../src/config';

const rootDir = config.dir.root;

export default {
  watchOptions: {
    ignored: /node_modules/,
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@npm': path.join(rootDir, 'node_modules'),
      '@image': path.join(rootDir, 'src/client/asset/image'),
      '@style': path.join(rootDir, 'src/client/asset/style'),
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

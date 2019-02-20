import path from 'path';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import VueLoaderPlugin from 'vue-loader/lib/plugin';
import config from '../../src/server/config';

const { root, upload, dist } = config.dir;

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
    new CopyWebpackPlugin([
      {
        from: path.join(root, 'src/client/asset/image/default-cover.png'),
        to: path.join(dist, 'client/img/default-cover.png'),
      },
    ]),
  ],
};

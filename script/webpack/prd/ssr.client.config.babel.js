import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import VueSSRClientPlugin from 'vue-server-renderer/client-plugin';
import webpackMerge from 'webpack-merge';
import config from '../../../src/server/config';
import base from './base.config.babel';

const { root, clientDist } = config.dir;
const { $public } = config.path;

export default webpackMerge(base, {
  entry: {
    index: path.join(root, 'src/client/index.js'),
  },
  output: {
    path: clientDist,
    publicPath: $public,
    filename: '[name].[hash:7].js',
    chunkFilename: 'script/[name].bundle.[hash:7].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App',
      template: 'src/client/index.html',
    }),
    new VueSSRClientPlugin({
      filename: 'manifest/vue-ssr-client-bundle.json',
    }),
    new webpack.DefinePlugin(
      {
        'process.client': true,
        'process.server': false,
      },
    ),
  ],
});

import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpackMerge from 'webpack-merge';
import config from '../../../src/config';
import base from './base.config.babel';

const rootDir = config.dir.root;
const publicPath = '/dist/';

export default webpackMerge(base, {
  entry: {
    index: path.join(rootDir, 'src/client/index.js'),
  },
  output: {
    path: path.join(rootDir, publicPath),
    publicPath,
    filename: '[name].js',
    chunkFilename: 'script/[name].bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App',
      template: 'src/client/index.html',
    }),
  ],
});

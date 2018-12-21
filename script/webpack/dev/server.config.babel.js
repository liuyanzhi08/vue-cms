import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';
import StartServerPlugin from 'start-server-webpack-plugin';
import path from 'path';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import config from '../../../src/server/config';
import base from './base.config.babel';

const { devClientDist, serverRoot } = config.dir;

export default webpackMerge(base, {
  watch: true,
  entry: ['webpack/hot/poll?1000', path.join(serverRoot, 'index.js')],
  output: { path: devClientDist, filename: 'index.js' },
  target: 'node',
  externals: [nodeExternals({ whitelist: ['webpack/hot/poll?1000'] })],
  module: {
    rules: [
      { test: /\.js?$/, use: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src'],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['.dist'], { root: process.cwd() }),
    new StartServerPlugin('index.js'),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
});

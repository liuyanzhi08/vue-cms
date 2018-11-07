import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';
import StartServerPlugin from 'start-server-webpack-plugin';
import path from 'path';
import config from '../../../src/config';
import base from './base.config.babel';

const rootDir = config.dir.root;

export default webpackMerge(base, {
  entry: ['webpack/hot/poll?1000', path.join(rootDir, 'src/server/index.js')],
  watch: true,
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
    new StartServerPlugin('index.js'),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  output: { path: path.join(rootDir, '/dist/server'), filename: 'index.js' },
});

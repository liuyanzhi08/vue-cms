import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';
import path from 'path';
import config from '../../../src/config';
import base from './base.config.babel';

const rootDir = config.dir.root;

export default webpackMerge(base, {
  entry: [path.join(rootDir, 'src/server/index.js')],
  output: { path: path.join(rootDir, '/dist/server'), filename: 'index.js' },
  target: 'node',
  externals: [nodeExternals()],
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
  ],
});

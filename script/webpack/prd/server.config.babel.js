import webpackMerge from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';
import path from 'path';
import config from '../../../src/server/config';
import base from './base.config.babel';

const { serverDist, serverRoot } = config.dir;

export default webpackMerge(base, {
  entry: [path.join(serverRoot, 'index.js')],
  output: { path: serverDist, filename: 'index.js' },
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

import path from 'path';
import VueSSRClientPlugin from 'vue-server-renderer/client-plugin';
import webpackMerge from 'webpack-merge';
import config from '../../../src/config';
import base from './base.config.babel';

const rootDir = config.dir.root;

export default webpackMerge(base, {
  entry: path.join(rootDir, 'src/client/index.js'),
  plugins: [
    new VueSSRClientPlugin({
      filename: 'manifest/vue-ssr-client-bundle.json',
    }),
  ],
});

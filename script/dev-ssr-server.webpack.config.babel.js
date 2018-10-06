import path from 'path';
import nodeExternals from 'webpack-node-externals';
import VueSSRServerPlugin from 'vue-server-renderer/server-plugin';
import merge from 'webpack-merge';
import base from './base.webpack.config.babel';
import config from '../src/config';

const rootDir = config.dir.root;
const clientPath = path.join(rootDir, 'src/client');
const distPath = path.join(rootDir, 'dist');

module.exports = merge(base, {
  // 将 entry 指向应用程序的 server entry 文件
  entry: path.join(clientPath, 'ssr/entry-server.js'),

  // 这允许 webpack 以 Node 适用方式(Node-appropriate fashion)处理动态导入(dynamic import)，
  // 并且还会在编译 Vue 组件时，
  // 告知 `vue-loader` 输送面向服务器代码(server-oriented code)。
  target: 'node',

  // 对 bundle renderer 提供 source map 支持
  devtool: 'source-map',

  // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
  output: {
    path: distPath,
    libraryTarget: 'commonjs2',
  },

  // https://webpack.js.org/configuration/externals/#function
  // https://github.com/liady/webpack-node-externals
  // 外置化应用程序依赖模块。可以使服务器构建速度更快，
  // 并生成较小的 bundle 文件。
  externals: nodeExternals({
    // 不要外置化 webpack 需要处理的依赖模块。
    // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
    // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
    whitelist: /\.css$/,
  }),

  // 这是将服务器的整个输出
  // 构建为单个 JSON 文件的插件。
  // 默认文件名为 `vue-ssr-server-bundle.json`
  plugins: [
    new VueSSRServerPlugin({
      filename: 'manifest/vue-ssr-server-bundle.json',
    }),
  ],
});

const path = require('path')
const webpack = require('webpack')
const BrowserSync = require('browser-sync')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const browserSync = BrowserSync.create();
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  entry: {
    index: path.resolve(__dirname, '../src/client/index.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist/'),
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader', options: {
              sourceMap: true,
            },
          },
          {
            loader: "css-loader", options: {
              sourceMap: true,
            },
          },
        ]
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          {
            loader: process.env.NODE_ENV !== 'production'
              ? 'vue-style-loader'
              : MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader", options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader', options: {
              sourceMap: true,
              config: {
                path: path.resolve(__dirname, 'postcss.config.js'),
              },
            },
          },
          {
            loader: "sass-loader", options: {
              sourceMap: true,
            },
          },
        ],
      },
      {test: /\.woff2?$|\.eot?$|\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$/, loader: "file-loader"},
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?name=image/[name].[ext]',
          'image-webpack-loader?bypassOnDebug'
        ]
      },
      {
        test: /bootstrap\/dist\/js\/umd\//, use: 'imports-loader?jQuery=jquery'
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'vue-resource': 'vue-resource/dist/vue-resource.esm.js',
      'style': path.resolve(__dirname, '../src/client/asset/style'),
    },
    extensions: ['.js', '.css', '.scss', '.vue']  //用于配置程序可以自行补全哪些文件后缀
  },
  plugins: [
    new CleanWebpackPlugin('dist', {} ),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      tether: 'tether',
      Tether: 'tether',
      'window.Tether': 'tether',
      Popper: ['popper.js', 'default'],
      'window.Tether': 'tether',
      Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
      Button: 'exports-loader?Button!bootstrap/js/dist/button',
      Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
      Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
      Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
      Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
      Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
      Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
      Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
      Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
      Util: 'exports-loader?Util!bootstrap/js/dist/util',
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'My App',
      template: 'src/client/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'style/[name].css',
      chunkFilename: 'style/[id].css',
    }),
  ],
}

browserSync.init({
  port: 1991,
  ui: {
    port: 1992
  },
  proxy: 'localhost:1993',
  files: ['dist/**/*', '!dist/static/**/*']
})

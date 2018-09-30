import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import VueLoaderPlugin from 'vue-loader/lib/plugin';
import config from '../src/config';

const publicPath = '/dist/';
const rootPath = path.resolve(__dirname, '..');

export default {
  mode: 'development',
  entry: [
    path.join(rootPath, 'src/client/index.js'),
  ],
  output: {
    path: path.join(rootPath, publicPath),
    publicPath,
    filename: '[name].js',
    chunkFilename: 'script/[name].bundle.js',
  },
  devtool: 'eval-source-map',
  devServer: {
    hot: true,
    host: '0.0.0.0',
    useLocalIp: true,
    historyApiFallback: {
      index: path.join(publicPath, 'index.html'),
    },
    publicPath,
    proxy: {
      '/api': `http://localhost:${config.server.port}`,
    },
    port: 8080,
    disableHostCheck: true,
    open: true,
    openPage: 'admin',
    overlay: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'vue-style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          {
            loader: 'vue-style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: path.resolve(__dirname, 'postcss.config.js'),
              },
            },
          },
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'font/[name].[ext]',
        },
      },
    ],
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@image': path.join(rootPath, 'src/client/asset/image'),
      '@style': path.join(rootPath, 'src/client/asset/style'),
    },
    extensions: ['.js', '.vue'],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'My App',
      template: 'src/client/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'style/[name].css',
      chunkFilename: 'style/[id].css',
    }),
  ],
};

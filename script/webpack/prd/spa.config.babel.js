import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import VueLoaderPlugin from 'vue-loader/lib/plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import config from '../../../src/config';

const postcssConfigPath = path.resolve(__dirname, '../../postcss.config.js');

const publicPath = '/dist/';
const rootDir = config.dir.root;

export default {
  entry: [
    path.join(rootDir, 'src/client/index.js'),
  ],
  output: {
    path: path.join(rootDir, publicPath),
    publicPath,
    filename: '[name].[hash:7].js',
    chunkFilename: 'script/[name].bundle.[hash:7].js',
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
        sideEffects: true,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
            },
          },
        ],
      },
      {
        test: /\.(sa|sc)ss$/,
        sideEffects: true,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: postcssConfigPath,
              },
            },
          },
          {
            loader: 'resolve-url-loader',
            options: {
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true, // todo why cannot remove this line
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'font/[name].[hash:7].[ext]',
        },
      },
    ],
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@image': path.join(rootDir, 'src/client/asset/image'),
      '@style': path.join(rootDir, 'src/client/asset/style'),
    },
    extensions: ['.js', '.vue', '.json'],
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
      filename: 'style/[name].[hash:7].css',
      chunkFilename: 'style/[id].[hash:7].css',
    }),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        extractComments: true,
        uglifyOptions: {
          cache: true,
          parallel: true,
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
};

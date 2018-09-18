import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import VueLoaderPlugin from 'vue-loader/lib/plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import BabelMinifyPlugin from 'babel-minify-webpack-plugin';

const publicPath = '/dist/';
const rootPath = path.resolve(__dirname, '..');

module.exports = {
  entry: [
    path.join(rootPath, 'src/client/index.js'),
  ],
  output: {
    path: path.join(rootPath, publicPath),
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
                path: path.resolve(__dirname, 'postcss.config.js'),
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
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
      tether: 'tether',
      Tether: 'tether',
      'window.Tether': 'tether',
      Popper: ['popper.js', 'default'],
      Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
      Button: 'exports-loader?Button!bootstrap/js/dist/button',
      Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
      Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
      Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
      Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
      Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
      Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
      Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
      Tooltip: 'exports-loader?Tooltip!bootstrap/js/dist/tooltip',
      Util: 'exports-loader?Util!bootstrap/js/dist/util',
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
    new BabelMinifyPlugin(),
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin({
      uglifyOptions: {
        compress: false,
      },
    })],
  },
};

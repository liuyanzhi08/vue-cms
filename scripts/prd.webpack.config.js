const path = require('path')
const webpack = require('webpack')
const BrowserSync = require('browser-sync')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackDevMiddleware = require('webpack-dev-middleware');
const UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    index: path.resolve(__dirname, '../src/client/index.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist/'),
    publicPath: '/dist/',
    filename: '[name].bundle.[chunkhash].js',
    chunkFilename: '[name].bundle.[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            extractCSS: true
          }
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
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {test: /\.woff2?$|\.eot?$|\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$/, loader: "file-loader"},
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'vue-resource': 'vue-resource/dist/vue-resource.esm.js',
      //'jquery': 'jquery/dist/jquery.js',
      'bootstrap.style': 'bootstrap-sass/assets/stylesheets/_bootstrap.scss',
      'bootstrap.script': 'bootstrap-sass/assets/javascripts/bootstrap.js',
      '../fonts/bootstrap': 'bootstrap-sass/assets/fonts/bootstrap',
      'element-ui.style': 'element-ui/lib/theme-chalk/index.css',
      './fonts/element-icons.ttf': 'element-ui/lib/theme-chalk/fonts/element-icons.ttf',
      './fonts/element-icons.woff': 'element-ui/lib/theme-chalk/fonts/element-icons.woff',
      'fontawesome': 'font-awesome/scss/font-awesome.scss',
      '../fonts/fontawesome-webfont.svg': 'font-awesome/fonts/fontawesome-webfont.svg',
      '../fonts/fontawesome-webfont.ttf': 'font-awesome/fonts/fontawesome-webfont.ttf',
      '../fonts/fontawesome-webfont.woff': 'font-awesome/fonts/fontawesome-webfont.woff',
      '../fonts/fontawesome-webfont.woff2': 'font-awesome/fonts/fontawesome-webfont.woff2',
      '../fonts/fontawesome-webfont.eot': 'font-awesome/fonts/fontawesome-webfont.eot',
      'simplemde.style': 'simplemde/dist/simplemde.min.css',
      'style': path.resolve(__dirname, '../src/client/asset/style'),
    },
    extensions:['.js','.css','.scss', '.vue']  //用于配置程序可以自行补全哪些文件后缀

  },
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    port: 1991,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
    }),
    new HtmlWebpackPlugin({
      title: 'My App',
      template: './src/client/index.html',
      minify:{ //压缩HTML文件
        removeComments:true,    //移除HTML中的注释
        collapseWhitespace:true    //删除空白符与换行符
      }
    }),
    new ExtractTextPlugin("[name].[hash].css"),
    new UglifyJSWebpackPlugin({
      compress: {     //压缩代码
        dead_code: true,    //移除没被引用的代码
        warnings: false,     //当删除没有用处的代码时，显示警告
        loops: true //当do、while 、 for循环的判断条件可以确定是，对其进行优化
      },
    })
  ],
  devtool: '#source-map'
}

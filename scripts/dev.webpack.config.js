const path = require('path')
const webpack = require('webpack')
const BrowserSync = require('browser-sync')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const browserSync = BrowserSync.create();
const autoprefixer = require('autoprefixer');
const precss = require('precss')
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, '../src/client/index.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist/'),
    publicPath: '/dist/',
    filename: '[name].bundle.[chunkhash].js',
    chunkFilename: '[name].bundle.[chunkhash].js',
  },
  devtool: 'source-map',
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
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
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
  plugins: [
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
    new HtmlWebpackPlugin({
      title: 'My App',
      template: 'src/client/index.html'
    }),
  ],
  devtool: '#eval-source-map'
}
if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        dead_code: true,    //移除没被引用的代码
        warnings: false,     //当删除没有用处的代码时，显示警告
        loops: true //当do、while 、 for循环的判断条件可以确定是，对其进行优化
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ])
} else {
  browserSync.init({
    port: 1991,
    ui: {
      port: 1992
    },
    proxy: 'localhost:1993',
    files: ['dist/**/*', '!dist/static/**/*']
  })

  // const { createBundleRenderer } = require('vue-server-renderer')
  // const bundle = require('./dist/client/vue-ssr-server-bundle.json')
  // const renderer = createBundleRenderer(bundle)
  // const context = { url: '/article/1' }
  // renderer.renderToString(context, (err, html) => {
  //     // 处理异常……
  //     console.log('t:', err, html)
  // })
}

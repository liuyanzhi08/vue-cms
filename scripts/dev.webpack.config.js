const path = require('path')
const webpack = require('webpack')
const BrowserSync = require('browser-sync')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

const browserSync = BrowserSync.create()

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
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader'
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
      './fonts/bootstrap': 'bootstrap-sass/assets/fonts/bootstrap',
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
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new HtmlWebpackPlugin({
      title: 'My App',
      template: 'src/client/index.html'
    }),
    // new VueSSRServerPlugin()
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
        warnings: false
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
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

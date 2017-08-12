var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: './src/client/index.js',
    output: {
        path: path.resolve(__dirname, './dist/client'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    devtool: "source-map",
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
                        loader: "css-loader",
                        options: {
                            alias: {
                                "../fonts/bootstrap": "bootstrap-sass/assets/fonts/bootstrap"
                            }
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            includePaths: [
                                path.resolve("./node_modules/bootstrap-sass/assets/stylesheets")
                            ]
                        }
                    }
                ]
            },
            { test: /\.woff2?$|\.eot?$|\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$/, loader: "file-loader" },
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
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
}
'use strict'
var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: {
        bundle: [
            path.resolve(__dirname, 'src/index.js')
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[id].[chunkhash].js',
        publicPath: require('./config.js').publicPath
    },
    debug: false,
    devtool: false,
    stats: {
        colors: true,
        reasons: false,
        progress: true
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            'src': path.join(__dirname, './src'),
            'containers': path.join(__dirname, './src/js/containers'),
            'components': path.join(__dirname, './src/js/components'),
            'js': path.join(__dirname, './src/js')
        }
    },
    module: {
        loaders: [
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                noParse: '/node_modules/',
                include: path.join(__dirname, 'src/')
            },
            {
                test: /\.sass$/,
                loader: ExtractTextPlugin.extract(
                    'style-loader',
                    'css-loader!sass-loader'
                )
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract(
                    'style-loader',
                    'css-loader!stylus-loader'
                )
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(
                    'style-loader',
                    'css-loader'
                )
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.(ttf|eot|png|gif|jpg|woff|woff2|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.(html|png)$/,
                loader: 'file?name=[path][name].[ext]&context=./src'
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, 'node_modules')
                    ) === 0
                )
            }
        }),
        new ExtractTextPlugin('styles.[hash].css'),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.ProvidePlugin({
            Promise: 'bluebird'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                properties: true,
                sequences: true,
                dead_code: true,
                drop_console: true,
                conditionals: true,
                comparisons: true,
                evaluate: true,
                booleans: true,
                unused: true,
                loops: true,
                hoist_funs: true,
                cascade: true,
                if_return: true,
                join_vars: true,
                drop_debugger: true,
                unsafe: true,
                hoist_vars: true,
                negate_iife: true
            },
            comments: false,
            mangle: true,
            minimize: true
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.ejs',
            inject: 'body',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                collapseInlineTagWhitspace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        })
    ]
}

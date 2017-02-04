var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        historyApiFallback: true
    },
    entry: [
        'webpack-hot-middleware/client',
        './src/index.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
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
        preLoaders: [
            {
                test: /\.jsx?$/,
                loader: 'eslint-loader',
                include: path.join(__dirname, 'src/'),
                exclude: /node_modules/
            }
        ],
        loaders: [
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                loaders: ['babel-loader'],
                include: path.join(__dirname, 'src/')
            },
            {
                test: /\.sass$/, loader: 'style!css!sass'
            },
            {
                test: /\.css$/, loader: 'style!css'
            },
            {
                test: /\.styl$/,
                loader: 'style-loader!css-loader!stylus-loader'
            },
            {
                test: /\.json$/, loader: 'json'
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
    eslint: {
        formatter: require('eslint-friendly-formatter')
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.ejs',
            inject: true
        })
    ]
}

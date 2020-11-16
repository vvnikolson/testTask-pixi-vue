const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const webpackBase = require('./webpack.base.js');
const path = require('path')
let config = require('./webpack.config.js');
let conlg = []

const webpackDevConfig = {
    mode: 'development',
    entry: config.entry,
    output: {
        path: path.resolve(config.root, "dist"),
        filename: "[name].[hash:6].bundle.js",
        publicPath: '/',
    },
    devServer: {
        open: false,
        contentBase: config.devPath,
        publicPath: "/",
        historyApiFallback: true,
        // hot: true,
        compress: true,
        inline:true,
        noInfo: true,
        port: config.port,
        host: config.host
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: conlg
            }
        }),
    ]
}

module.exports = merge(webpackBase, webpackDevConfig)
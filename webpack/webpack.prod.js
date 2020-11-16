const {merge} = require('webpack-merge')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const _version = new Date().getTime();
const webpackbase = require('./webpack.base.js');
const config = require('./webpack.config.js');
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin');

const webpackProdConfig = {
    mode: 'production',
    entry: config.entry,
    output: {
        path: `${config.outPath}/`,
        publicPath: './',
        filename: `js/[name].js`,
        chunkFilename: `js/chunk.[name].js`,
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: 6,
                terserOptions: {
                    compress: {
                        warnings:false,
                        drop_console: true,
                        drop_debugger:true,
                    },
                },
            }),
            new OptimizeCssAssetsPlugin({
                cssProcessor: require('cssnano')
            })
        ],
        splitChunks: {
            chunks: 'all'
        }
    },
}
module.exports = merge(webpackbase, webpackProdConfig)
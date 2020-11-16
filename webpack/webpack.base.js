let HtmlWebpackPlugin = require('html-webpack-plugin');
let config = require('./webpack.config.js');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

let webpackBase = {
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json'],
        alias: {
            'vue': '@vue/runtime-dom'
        },
        modules: [
            path.join(config.root, "src"),
            path.join(config.root, "node_modules")
        ]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        }
                    },
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            postcssOptions: {
                                plugins: [
                                    ['autoprefixer']
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.(scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        }
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            postcssOptions: {
                                plugins: [
                                    ['autoprefixer']
                                ]
                            }
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            babelrc: true
                        }
                    },
                    {
                        loader: "ts-loader",
                        options: {
                            appendTsSuffixTo: [/\.vue$/]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "main.css"
        }),
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            //filename: "index.html",
            template: path.join(config.root, './static/index.html'),
            title: 'TestTask',
            host: config.devPath,
            prod: false,
        })
    ]
}

module.exports = webpackBase;
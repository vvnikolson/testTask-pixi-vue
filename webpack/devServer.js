const webpack = require("webpack")
const webpackConfig = require("./webpack.dev.js");
let WebpackDevServer = require('webpack-dev-server')

let config = require('./webpack.config.js')
const compiler = webpack(webpackConfig)
let devServerOptions = Object.assign({}, webpackConfig.devServer)

const server = new WebpackDevServer(compiler, devServerOptions)
server.listen(config.port, config.devServer, () => {
    console.log(`Starting server on http://${config.devServer}:${config.port}`);
});
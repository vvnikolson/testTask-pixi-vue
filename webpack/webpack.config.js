const path = require("path")

module.exports = {
    root: path.resolve(__dirname, '../'),
    entry: './src/main.ts',
    publicPath: './',
    outPath: path.resolve(__dirname,'..', './dist'),
    devPath: path.resolve(__dirname,'..', './build'),
    devServer: 'localhost',
    root: path.resolve(__dirname, '..'),
    host: '0.0.0.0',
    port: 8000
}
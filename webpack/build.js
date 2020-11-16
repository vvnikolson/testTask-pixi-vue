const webpack = require('webpack')
const webpackConfig = require("./webpack.prod.js");

webpack(webpackConfig, (err, state) => {});
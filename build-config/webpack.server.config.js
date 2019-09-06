//https://github.com/bengrunfeld/expack/blob/master/webpack.server.config.js
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = (env, argv) => {
  const SERVER_PATH = './index.js'

  return ({
    entry: {
      startToppings: SERVER_PATH,
      initTopping: './initTopping.js'
    },
    output: {
      path: path.join(__dirname, '../public'),
      publicPath: '/',
      filename: '[name].js'
    },
    mode: 'production',
    target: 'node',
    node: {
      __dirname: false,
      __filename: false,
    },
    externals: [nodeExternals()],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    }
  })
}
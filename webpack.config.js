'use strict'

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: `${__dirname}/src/main`,
  devtool: 'source-map',
  entry: './main.js',
  output: {
    path: './docs/',
    filename: './bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.json']
  },
  module: {
    loaders: [
      {test: /\.js$/, loaders: ['babel-loader', 'eslint-loader']}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './main.htm',
      filename: './index.html'
    })
  ]
}

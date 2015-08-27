var fs = require('fs')
var webpack = require('webpack')
module.exports = {
  entry: './index.coffee',
  output: {
    path: '.',
    filename: 'all-test.js'
  },
  module: {
    loaders: [
      { test: /\.coffee$/, loader: 'coffee-loader' },
    ]
  },
  plugins: []
}

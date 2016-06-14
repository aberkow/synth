var path = require('path');
var webpack = require('webpack');
var packageData = require('./package.json');

module.exports = {
  entry: path.resolve(__dirname, packageData.main),
  output: {
    path: path.resolve(__dirname, 'build/js'),
    filename: 'bundle.js'
  },
  watch: true,
  devtool: 'source-map',
}

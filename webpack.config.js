var path = require('path');

var config = {
  context: path.join(__dirname, 'src'),
  entry: [
    './server/main.js',
  ],
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel'],
      },
      {
        test: /\.node$/,
        loaders: ['node']
      },
    ],
  },
  resolveLoader: {
    root: [
      path.join(__dirname, 'node_modules'),
      path.join(__dirname, 'src'),
    ],
  },
  resolve: {
    extensions: [ '', '.js', '.json', '.jsx', '.es6', '.babel', '.node'],
    root: [
      path.join(__dirname, 'node_modules'),
      path.join(__dirname, 'src'),
    ],
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    },
  },
};
module.exports = config;

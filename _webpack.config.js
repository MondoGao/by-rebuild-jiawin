var webpack = require('webpack');
var path = require('path');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
// var ExtractTextPlugin = require("extract-text-webpack-plugin");

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'entry.js');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = {
  entry: APP_PATH,
  output: {
    path: BUILD_PATH,
    filename: 'index.js'
  },
  module: {
    loaders: [
    //   {test: /\.scss$/,loader: ExtractTextPlugin.extract(['css','sass'])},
    //   {test: /\.css$/, loader: ExtractTextPlugin.extract("css")},
      {test: /\.scss$/,loaders: ['style','css','sass']},
      {test: /\.css$/, loaders:['style','css']},
      {test: /\.(png|jpg)$/,loader: 'url?limit=40000'}
    ]
  },
  devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true
  },
  plugins: [
    //   new ExtractTextPlugin("index.css")
  ]
};

import webpack from 'webpack';
import path from 'path';

import CleanWebpackPlugin from "clean-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

const config = {
  entry: './src/wanna.js',
  output: {
    filename: 'wanna.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([{
      from: 'static'
    }]),
    new webpack.optimize.UglifyJsPlugin({
      // sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ],
  devtool: '#source-map',
};

module.exports = config;

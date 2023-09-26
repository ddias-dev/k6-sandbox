import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { merge } from 'lodash';
import * as path from 'path';
import * as webpack from 'webpack';

const glob_entries = require('webpack-glob-entries');

const config: webpack.Configuration = {
  mode: 'development',
  entry: merge(glob_entries('./src/*.test.ts'), glob_entries('./libs/*.ts')),
  output: {
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'commonjs'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  target: 'web',
  externals: /^(k6|https?\:\/\/)(\/.*)?/,
  stats: {
    colors: true
  },
  plugins: [new CleanWebpackPlugin()],
  optimization: {
    // Don't minimize, as it's not used in the browser
    minimize: false
  }
};

export default config;

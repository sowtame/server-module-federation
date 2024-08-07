const path = require('path')
const { merge } = require('webpack-merge')
const LoadablePlugin = require('@loadable/webpack-plugin')
const shared = require('./webpack.shared')
const moduleFederationPlugin = require('./module-federation')
const webpack = require('webpack')

const cssRegex = /\.css$/
const cssModuleRegex = /\.module\.css$/

/**
 * @type {import('webpack').Configuration}
 **/
const webpackConfig = {
  name: 'server',
  target: false,
  entry: {
    main: ['@babel/polyfill', path.resolve(__dirname, '../src/server/index')],
  },
  externals: {
    express: 'express',
  },
  output: {
    path: path.resolve(__dirname, '../dist/server'),
    filename: '[name].js',
    libraryTarget: 'commonjs-module',
  },
  plugins: [
    new LoadablePlugin({
      writeToDisk: true,
    }),

    new webpack.HotModuleReplacementPlugin(),

    ...moduleFederationPlugin.server,
  ],
  stats: {
    colors: true,
  },
  module: {
    rules: [
      {
        test: cssRegex,
        exclude: cssModuleRegex,
        loader: require.resolve('null-loader'),
      },
    ],
  },
}

module.exports = merge(shared, webpackConfig)

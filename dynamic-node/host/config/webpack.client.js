const path = require('path')
const { merge } = require('webpack-merge')
const LoadablePlugin = require('@loadable/webpack-plugin')
const shared = require('./webpack.shared')
const moduleFederationPlugin = require('./module-federation')
const InitialAssetsPlugin = require('./plugins/initial-assets-plugin')

/**
 * @type {import('webpack').Configuration}
 **/
const webpackConfig = {
  name: 'client',
  target: 'web',
  entry: {
    index: ['@babel/polyfill', path.resolve(__dirname, '../src/client/index')],
    bootstrapIndex: ['@babel/polyfill', path.resolve(__dirname, '../src/client/bootstrap')],
  },
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/static/',
  },
  plugins: [
    new LoadablePlugin({
      writeToDisk: true,
    }),

    new InitialAssetsPlugin(),
    ...moduleFederationPlugin.client,
  ],
}

module.exports = merge(shared, webpackConfig)

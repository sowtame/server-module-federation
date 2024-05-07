const path = require('path')
const { merge } = require('webpack-merge')
const LoadablePlugin = require('@loadable/webpack-plugin')
const shared = require('./webpack.shared')
const moduleFederationPlugin = require('./module-federation')
const LazyComponentsPlugin = require('./plugins/lazy-components')
const CrtiticalCssPlugin = require('./plugins/critical-css-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
/**
 * @type {import('webpack').Configuration}
 **/
const webpackConfig = {
  name: 'client',
  target: 'web',
  entry: {
    index: ['@babel/polyfill', path.resolve(__dirname, '../src/client/index')],
  },
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: 'http://localhost:8080/static/',
  },
  module: {
    rules: [
      {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, './postcss.config.js'),
              },
            },
          },
        ],
      },
      {
        test: cssModuleRegex,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, './postcss.config.js'),
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new LoadablePlugin(),
    new LazyComponentsPlugin({
      writeToDisk: true,
    }),
    new CrtiticalCssPlugin({
      writeToDisk: true,
    }),
    ...moduleFederationPlugin.client,
  ],
}

module.exports = merge(shared, webpackConfig)

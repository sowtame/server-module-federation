const path = require('path')
const { merge } = require('webpack-merge')
const LoadablePlugin = require('@loadable/webpack-plugin')
const shared = require('./webpack.shared')
const moduleFederationPlugin = require('./module-federation')
const LazyComponentsPlugin = require('./plugins/lazy-components')
const CrtiticalCssPlugin = require('./plugins/critical-css-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CoreComponentsPathAliasPlugin = require('./plugins/core-components-path-alias-plugin')
const getCSSModuleLocalIdent = require('./utils/get-css-module-local-ident')

const cssRegex = /\.css$/
const cssModuleRegex = /\.module\.css$/

/**
 * @type {import('webpack').Configuration}
 **/
const webpackConfig = {
  name: 'client',
  target: 'web',
  entry: {
    index: [path.resolve(__dirname, '../src/client/index')],
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
              modules: {
                getLocalIdent: (context, _, localName) => {
                  return getCSSModuleLocalIdent(context, localName)
                },
              },
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
    new CoreComponentsPathAliasPlugin({ folder: 'moderncssm' }),
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

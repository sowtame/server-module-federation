const path = require('path')
const { merge } = require('webpack-merge')
const LoadablePlugin = require('@loadable/webpack-plugin')
const shared = require('./webpack.shared')
const moduleFederationPlugin = require('./module-federation')
const InitialAssetsPlugin = require('./plugins/initial-assets-plugin')
const CoreComponentsPathAliasPlugin = require('./plugins/core-components-path-alias-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
    // index: ['@babel/polyfill', path.resolve(__dirname, '../src/client/index')],
    // bootstrapIndex: ['@babel/polyfill', path.resolve(__dirname, '../src/client/bootstrap')],
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
    // new CoreComponentsPathAliasPlugin({ folder: 'moderncssm' }),
    ...moduleFederationPlugin.client,
  ],
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
    ],
  },
}

module.exports = merge(shared, webpackConfig)

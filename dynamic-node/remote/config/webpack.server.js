const path = require('path')
const { merge } = require('webpack-merge')
const LoadablePlugin = require('@loadable/webpack-plugin')
const shared = require('./webpack.shared')
const moduleFederationPlugin = require('./module-federation')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CoreComponentsPathAliasPlugin = require('./plugins/core-components-path-alias-plugin')
const getCSSModuleLocalIdent = require('./utils/get-css-module-local-ident')

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
  module: {
    rules: [
      {
        test: cssRegex,
        exclude: cssModuleRegex,
        loader: require.resolve('null-loader'),
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
    new CoreComponentsPathAliasPlugin({ folder: 'cssm' }),
    new LoadablePlugin({
      writeToDisk: true,
    }),

    ...moduleFederationPlugin.server,
  ],
  stats: {
    colors: true,
  },
}

module.exports = merge(shared, webpackConfig)

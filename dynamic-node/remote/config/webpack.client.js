const path = require('path')
const { merge } = require('webpack-merge')
const shared = require('./webpack.shared')
const moduleFederationPlugin = require('./module-federation')
const LazyComponentsPlugin = require('./plugins/lazy-components')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CoreComponentsPathAliasPlugin = require('./plugins/core-components-path-alias-plugin')
const CrtiticalCssPlugin = require('./plugins/critical-css-plugin')
const getCSSModuleLocalIdent = require('./utils/get-css-module-local-ident')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { Features } = require('lightningcss')

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
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: 'http://localhost:8080/static/',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        minify: CssMinimizerPlugin.lightningCssMinify,
        minimizerOptions: {
          // cssModules: true,
          // targets: ['>= 0.25%'],
        },
      }),
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        // styles: {
        //   name: 'critical-css',
        //   type: 'css/mini-extract',
        //   chunks: 'all',
        //   enforce: true,
        // },
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
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
    // new LoadablePlugin(),
    new LazyComponentsPlugin({
      writeToDisk: true,
    }),
    new CrtiticalCssPlugin({
      apply: true,
    }),
    ...moduleFederationPlugin.client,
  ],
}

module.exports = merge(shared, webpackConfig)

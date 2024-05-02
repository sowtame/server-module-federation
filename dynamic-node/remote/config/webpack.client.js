const path = require('path')
const { merge } = require('webpack-merge')
const LoadablePlugin = require('@loadable/webpack-plugin')
const shared = require('./webpack.shared')
const moduleFederationPlugin = require('./module-federation')
const LazyComponentsPlugin = require('./plugins/lazy-components')
const CrtiticalCssPlugin = require('./plugins/critical-css-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const cssRegex = /\.css$/
const cssModuleRegex = /\.modules\.css$/

const MODULE_PATH_REGEX = /.*[\\/]node_modules[\\/](?!\.pnpm[\\/])(?:(@[^\\/]+)[\\/])?([^\\/]+)/

function getPackageNameFromModulePath(modulePath) {
  const handleModuleContext = modulePath?.match(MODULE_PATH_REGEX)
  console.log('🚀 ~ getPackageNameFromModulePath ~ handleModuleContext:', handleModuleContext)

  if (!handleModuleContext || handleModuleContext.length < 2) {
    return undefined
  }

  console.log(handleModuleContext)

  const [, scope, name] = handleModuleContext
  const packageName = ['npm', (scope ?? '').replace('@', ''), name].filter(Boolean).join('.')

  return packageName
}

module.exports = merge(shared, {
  name: 'client',
  target: 'web',
  entry: {
    index: ['@babel/polyfill', path.resolve(__dirname, '../src/client/index')],
  },
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: '[name].js',
    chunkFilename: (pathData, assetInfo) => {
      console.log('🚀 ~ pathData:', pathData.chunk)
      debugger
      // return pathData.chunk.name === 'main' ? '[name].js' : '[name]/[name].js'
      return getPackageNameFromModulePath(pathData.chunk.id) || 'failed_[name].js'
    },
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
})

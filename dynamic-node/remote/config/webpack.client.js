const path = require('path')
const { merge } = require('webpack-merge')
const LoadablePlugin = require('@loadable/webpack-plugin')
const shared = require('./webpack.shared')
const moduleFederationPlugin = require('./module-federation')
const LazyComponentsPlugin = require('./plugins/lazy-components')
const WebpackAssetsManifest = require('webpack-assets-manifest')

module.exports = merge(shared, {
  name: 'client',
  target: 'web',
  entry: {
    clientAppEntrypoint: ['@babel/polyfill', path.resolve(__dirname, '../src/client/clientAppEntrypoint')],
  },
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: 'http://localhost:8080/static/',
  },
  plugins: [
    new LoadablePlugin(),
    new LazyComponentsPlugin({
      writeToDisk: true,
    }),
    new WebpackAssetsManifest({
      output: 'crititcal-css.json',
      publicPath: true,
      entrypoints: true,
      contextRelativeKeys: true,
      entrypointsUseAssets: true,

      // transform: (assets, manifest) => {
      //   console.log('🚀 ~ file: webpack.client.js:27 ~ assets', assets)

      //   const onlyCss = Object.values(assets).filter((key) => {
      //     if (key.includes('css')) {
      //       return true
      //     }
      //   })

      //   console.log(onlyCss)
      //   return onlyCss
      // },
      customize: (entry, _, manifest, a, b) => {
        if (entry.key.includes('css')) {
          debugger
        }
        return entry
      },
    }),

    ...moduleFederationPlugin.client,
  ],
})

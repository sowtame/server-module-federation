const deps = require('../package.json').dependencies
const { ModuleFederationPlugin } = require('webpack').container
const { NodeFederationPlugin, StreamingTargetPlugin } = require('@module-federation/node')
const FederationStatsPlugin = require('webpack-federation-stats-plugin')

const shared = {
  react: { requiredVersion: deps.react, singleton: true },
  'react-dom': { requiredVersion: deps['react-dom'], singleton: true },
  'keen-slider/': { requiredVersion: deps['keen-slider'], singleton: true },
}

module.exports = {
  client: [
    new FederationStatsPlugin(),
    new ModuleFederationPlugin({
      name: 'app1',
      filename: 'remoteEntry.js',
      remotes: {},
      shared,
    }),
  ],
  server: [
    new NodeFederationPlugin({
      name: 'app1',
      library: { type: 'commonjs-module' },
      filename: 'remoteEntry.js',
      remotes: {},
      shared,
    }),
    new StreamingTargetPlugin({
      name: 'app1',
      library: { type: 'commonjs-module' },
      remotes: {},
    }),
  ],
}

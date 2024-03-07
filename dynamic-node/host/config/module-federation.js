const deps = require('../package.json').dependencies
const { ModuleFederationPlugin } = require('webpack').container
const { NodeFederationPlugin, StreamingTargetPlugin } = require('@module-federation/node')
const FederationStatsPlugin = require('webpack-federation-stats-plugin')

module.exports = {
  client: [
    new FederationStatsPlugin(),
    new ModuleFederationPlugin({
      name: 'app1',
      filename: 'remoteEntry.js',
      remotes: {},
      shared: [{ react: deps.react, 'react-dom': deps['react-dom'] }],
    }),
  ],
  server: [
    new NodeFederationPlugin({
      name: 'app1',
      library: { type: 'commonjs-module' },
      filename: 'remoteEntry.js',
      remotes: {},
      shared: [
        {
          react: { requiredVersion: deps.react, singleton: true },
          'react-dom': { requiredVersion: deps['react-dom'], singleton: true },
        },
      ],
    }),
    new StreamingTargetPlugin({
      name: 'app1',
      library: { type: 'commonjs-module' },
      remotes: {},
    }),
  ],
}

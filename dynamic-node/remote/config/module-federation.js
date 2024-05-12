const deps = require('../package.json').dependencies
const { ModuleFederationPlugin } = require('webpack').container
const { NodeFederationPlugin, StreamingTargetPlugin } = require('@module-federation/node')
const FederationStatsPlugin = require('webpack-federation-stats-plugin')

module.exports = {
  client: [
    new FederationStatsPlugin(),
    new ModuleFederationPlugin({
      name: 'app2',
      filename: 'remoteEntry.js',
      exposes: {
        './desktop': './src/client/remote',
      },
      remotes: {},
      shared: {
        react: { requiredVersion: deps.react, singleton: true },
        'react-dom': { requiredVersion: deps['react-dom'], singleton: true },
        // '@alfalab/core-components/': { requiredVersion: deps['@alfalab/core-components'] },
      },
    }),
  ],
  server: [
    new NodeFederationPlugin({
      name: 'app2',
      library: { type: 'commonjs-module' },
      filename: 'remoteEntry.js',
      exposes: {
        './desktop': './src/client/remote',
      },
      shared: [
        {
          react: { requiredVersion: deps.react, singleton: true },
          'react-dom': { requiredVersion: deps['react-dom'], singleton: true },
          // '@alfalab/core-components/': { requiredVersion: deps['@alfalab/core-components'] },
        },
      ],
    }),
    new StreamingTargetPlugin({
      name: 'app2',
      library: { type: 'commonjs-module' },
      remotes: {},
    }),
  ],
}

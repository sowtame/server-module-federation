/**
 * @type {import('webpack').Configuration}\
 **/

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const styles = []

const getConfig = (client) => {
  const clientConfig = client
    ? {
        // insert: '#remote-id',
        // runtime: false,
        insert: (linkTag) => {
          const container = document.getElementById('remote-id')

          if (container?.shadowRoot) {
            let wrap = container?.shadowRoot.getElementById('wrap-styles')

            if (!wrap) {
              wrap = document.createElement('div')

              wrap.setAttribute('id', 'wrap-styles')

              container.shadowRoot.appendChild(wrap)
            }
            wrap.appendChild(linkTag)

            if (String(linkTag.outerHTML).includes('boot')) {
              debugger
            }
            return
          }
          document.head.appendChild(linkTag)
        },
      }
    : {}

  return {
    mode: 'development',
    devtool: 'inline-source-map',

    optimization: {
      minimize: false,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          type: 'javascript/auto',
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(js|ts)x?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        ...clientConfig,

        filename: '[name].[contenthash:8].css',
        chunkFilename: '[name].[contenthash:8].chunk.css',
      }),
    ],
  }
}

module.exports = getConfig

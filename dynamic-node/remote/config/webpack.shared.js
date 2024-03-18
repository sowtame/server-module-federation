/**
 * @type {import('webpack').Configuration}\
 **/

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const styles = []

const getConfig = (client) => {
  const clientConfig = client
    ? {
        insert: (linkTag) => {
          // const container = document.getElementById('remote-id')
          // console.log('🚀 ~ getConfig ~ container:', container.shadowRoot)
          // const shadowtest = document.getElementById('shadow-test')
          // console.log('🚀 ~ getConfig ~ shadowtest:', shadowtest)
          // const containerInner = document.getElementById('remote-id-inner')

          // if (!container.shadowRoot) {
          //   const shadowContainer = container.attachShadow({ mode: 'open' })
          //   const shadowRootElement = document.createElement('div')

          //   // shadowContainer.appendChild(shadowRootElement)
          //   // shadowContainer.appendChild(containerInner)
          // }

          // if (container.shadowRoot) {
          //   container.shadowRoot.appendChild(linkTag)
          //   return
          // }

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

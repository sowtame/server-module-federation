import App from '../client/root'
import { renderToString } from 'react-dom/server'
import axios from 'axios'
import fs from 'fs'
// import as from 'assets-retry'
import { loadServerRemote } from './utils/load-server-remote'

// const as = require('./retry-tinkoff')
// console.log('🚀 ~ as:', as)

// console.log(fs.readFileSync('./retry'))

// console.log(require.resolve('assets-retry'))

const path = require.resolve('./retry-tinkoff')
console.log('🚀 ~ path:', path)

// console.log('fs.readFileSync(require.resolve', fs.readFileSync(require.resolve('assets-retry')))

// console.log(fs.readFileSync(require.resolve('assets-retry')))

export async function serverRender(req, res, next) {
  const container = await loadServerRemote({
    global: 'app2',
    url: 'http://localhost:8080/server/remoteEntry.js',
  })

  const initialAssetsString = fs.readFileSync(`${process.cwd()}/dist/client/initial-assets.json`, 'utf-8')
  // console.log('🚀 ~ path:', fs.readFileSync(path, 'utf-8'))

  const initialAssets = JSON.parse(initialAssetsString)

  let cssLinks = initialAssets.css
  try {
    const { data } = await axios.get<string[]>('http://localhost:8080/static/crititcal-css.json')
    cssLinks = data
  } catch (error) {}

  const factory = await container.get('./desktop')

  const RemoteModule = factory()

  const markup = renderToString(<App url={req.url} RemoteApp={RemoteModule.default} />)

  res.statusCode = 200
  res.setHeader('Content-type', 'text/html')
  res.write('<!DOCTYPE html>')
  res.write('<html>')

  res.write(`<head>`)
  {
    cssLinks.map(({ src }) => {
      res.write(`<link rel="stylesheet" href="${src}"/>`)
    })
  }
  res.write(`</head>`)
  res.write(`<body>`)
  res.write(`<div id="root">${markup}</div>`)

  {
    ;[
      {
        src: '/static/index.js',
      },
    ].map(({ src }) => {
      res.write(`<script async src=${src}></script>`)
    })
  }
  res.write(`<script async defer>${fs.readFileSync(path, 'utf-8')}</script>`)
  //   res.write(`<script async defer>${fs.readFileSync(path, 'utf-8')}</script>`)
  //   res.write(`<script>
  //     window.assetsRetryStatistics = window.assetsRetry({
  //       // domain list, only resources in the domain list will be retried.
  //     domain: ['your.first.domain', 'your.second.domain/namespace'],
  //     // maximum retry count for each asset, default is 3
  //     maxRetryCount: 3,
  //     // onRetry hook is how you can customize retry logic with, default is x => x
  //     onRetry: function(currentUrl, originalUrl, statistics) {
  //         return currentUrl
  //     },
  //     // for a given resource (except background-images in css),
  //     // either onSuccess or onFail will be eventually called to
  //     // indicate whether the resource has been successfully loaded
  //     onSuccess: function(currentUrl) {
  //         console.log(currentUrl, assetsRetryStatistics[currentUrl])
  //     },
  //     onFail: function(currentUrl) {
  //         console.log(currentUrl, assetsRetryStatistics[currentUrl])
  //     }
  // })
  //   </script>`)
  res.write('<script async src="http://localhost:8080/static/remoteEntry.js"></script>')
  res.write('</body></html>')
  res.send()

  next()
}

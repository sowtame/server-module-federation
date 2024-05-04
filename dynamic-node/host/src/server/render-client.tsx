import App from '../client/root'
import { renderToString } from 'react-dom/server'
import axios from 'axios'
import fs from 'fs'
import { loadServerRemote } from './utils/load-server-remote'

export default async function serverRender(req, res, next) {
  const container = await loadServerRemote({
    global: 'app2',
    url: 'http://localhost:8080/server/remoteEntry.js',
  })

  const initialAssetsString = fs.readFileSync(`${process.cwd()}/dist/client/initial-assets.json`, 'utf-8')

  const initialAssets = JSON.parse(initialAssetsString)

  let cssLinks = []
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
    cssLinks.map((href) => {
      res.write(`<link rel="stylesheet" href="${href}"/>`)
    })
  }
  res.write(`</head>`)
  res.write(`<body>`)
  res.write(`<div id="root">${markup}</div>`)

  {
    initialAssets.map(({ src }) => {
      res.write(`<script async src=${src}></script>`)
    })
  }
  res.write('<script async src="http://localhost:8080/static/remoteEntry.js"></script>')
  res.write('</body></html>')
  res.send()

  next()
}

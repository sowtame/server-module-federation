import { renderToString } from 'react-dom/server'
import axios from 'axios'
import fs from 'fs'
import { loadServerRemote } from './utils/load-server-remote'
import { Html } from './html'

export async function serverRender(req, res, next) {
  const container = await loadServerRemote({
    global: 'app2',
    url: 'http://localhost:8080/server/remoteEntry.js',
  })
  const factory = await container.get('./desktop')

  const RemoteModule = factory()

  const initialAssetsString = fs.readFileSync(`${process.cwd()}/dist/client/initial-assets.json`, 'utf-8')

  const initialAssets = JSON.parse(initialAssetsString)

  let cssLinks = initialAssets.css
  try {
    const { data } = await axios.get<string[]>('http://localhost:8080/static/crititcal-css.json')
    cssLinks = [...cssLinks, ...data]
  } catch (error) {}

  const markup = renderToString(<Html url={req.url} RemoteModule={RemoteModule.default} cssLinks={cssLinks} jsLinks={initialAssets.js} />)

  res.statusCode = 200
  res.setHeader('Content-type', 'text/html')
  res.write(`<!DOCTYPE html>${markup}`)
  res.send()

  next()
}

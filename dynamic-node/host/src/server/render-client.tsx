import App from '../client/root'
import { renderToString } from 'react-dom/server'
import axios from 'axios'
import { injectScript } from '@module-federation/utilities'

export default async function serverRender(req, res, next) {
  const container = await injectScript({
    global: 'app2',
    url: 'http://localhost:8080/server/remoteEntry.js',
  })

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

  res.write('<script async data-chunk="main" src="http://localhost:8081/static/index.js"></script>')
  res.write('<script async src="http://localhost:8080/static/remoteEntry.js"></script>')
  res.write('</body></html>')
  res.send()

  next()
}

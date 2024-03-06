import App from '../client/components/App'
import { renderToString } from 'react-dom/server'
import React from 'react'
import { injectScript } from '@module-federation/utilities'

export default async function serverRender(req, res, next) {
  // fake import needed in order to tell webpack to include chunk loading runtime code
  // @ts-ignore
  // import('fake')

  const container = await injectScript({
    global: 'app2',
    url: 'http://localhost:8080/server/remoteEntry.js',
  })

  const factory = await container.get('./desktop')

  const RemoteModule = factory()

  const html = renderToString(<App RemoteApp={RemoteModule.default} />)
  res.statusCode = 200
  res.setHeader('Content-type', 'text/html')
  res.write('<!DOCTYPE html>')
  res.write('<html>')

  res.write(`<head>`)
  res.write(`<link rel="stylesheet" href="http://localhost:8080/static/src_client_clientRender_tsx.css"/>`)
  res.write(`</head>`)
  res.write(`<body>`)
  res.write(`<div id="root">${html}</div>`)

  res.write('<script async data-chunk="main" src="http://localhost:8081/static/clientAppEntrypoint.js"></script>')
  res.write('<script async src="http://localhost:8080/static/remoteEntry.js"></script>')
  res.write('</body></html>')
  res.send()

  next()
}

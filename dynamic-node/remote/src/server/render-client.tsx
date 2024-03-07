import { renderToString } from 'react-dom/server'
import App from '../client/root'

export default async function serverRender(req, res, next) {
  const markup = renderToString(<App />)

  res.statusCode = 200
  res.setHeader('Content-type', 'text/html')
  res.write('<!DOCTYPE html>')
  res.write('<html>')

  // res.write(`<head>${linkTags}</head><body>`)
  res.write(`<div id="root">${markup}</div>`)

  // res.write(scriptTags)
  res.write('<script async data-chunk="main" src="http://localhost:8080/static/index.js"></script>')
  res.write('</body></html>')
  res.send()

  next()
}

import { renderToString } from 'react-dom/server'
import { Request } from 'express'
import RootDev from '../client/root'

export default async function serverRender(req: Request, res, next) {
  const markup = renderToString(<RootDev url={req.url} />)

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

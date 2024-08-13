import { renderToString } from 'react-dom/server'
import { Request } from 'express'
import fs from 'fs'
import { getCriticalRules, loadSerializedLookup } from 'used-styles'
import RootDev from '../client/root'

const path = `${process.cwd()}/dist/server/styles-lookup.json`

// const path2 = require('./../../dist/server/styles-lookup.json')

const initialAssetsString = fs.readFileSync(`${process.cwd()}/dist/server/styles-lookup.json`, 'utf-8')

const initialAssets = JSON.parse(initialAssetsString)

const stylesLookup = loadSerializedLookup(initialAssets)

export default async function serverRender(req: Request, res, next) {
  const markup = renderToString(<RootDev url={req.url} />)

  const css = getCriticalRules(markup, stylesLookup)

  console.log(css)

  res.statusCode = 200
  res.setHeader('Content-type', 'text/html')
  res.write('<!DOCTYPE html>')
  res.write('<html>')

  res.write(`<head><style type="text/css">${css}</style></head>`)

  res.write(`<body>`)
  res.write(`<div id="root">${markup}</div>`)

  // res.write(scriptTags)
  res.write('<script async data-chunk="main" src="http://localhost:8080/static/index.js"></script>')
  res.write('</body></html>')
  res.send()

  next()
}

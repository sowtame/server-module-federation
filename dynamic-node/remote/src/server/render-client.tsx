import { renderToString } from 'react-dom/server'
import { Request } from 'express'
import fs from 'fs'
import { loadSerializedLookup } from 'used-styles'
import RootDev from '../client/root'
import { Html } from './html'

const initialAssetsString = fs.readFileSync(`${process.cwd()}/dist/server/styles-lookup.json`, 'utf-8')

const initialAssets = JSON.parse(initialAssetsString)

export const stylesLookup = loadSerializedLookup(initialAssets)

export default async function serverRender(req: Request, res, next) {
  const markupApp = renderToString(<RootDev url={req.url} />)

  const markup = renderToString(<Html markupApp={markupApp} />)

  res.statusCode = 200
  res.setHeader('Content-type', 'text/html')
  res.write(`<!DOCTYPE html>${markup}`)
  res.send()

  next()
}

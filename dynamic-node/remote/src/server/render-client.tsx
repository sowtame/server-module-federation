import { renderToString } from 'react-dom/server'
import { Request } from 'express'
import fs from 'fs'
import { getCriticalRules, loadSerializedLookup } from 'used-styles'
import RootDev from '../client/root'
import { Html } from './html'

var postcss = require('postcss')
var cssvariables = require('postcss-css-variables')

const path = `${process.cwd()}/dist/server/styles-lookup.json`

// const path2 = require('./../../dist/server/styles-lookup.json')

const initialAssetsString = fs.readFileSync(`${process.cwd()}/dist/server/styles-lookup.json`, 'utf-8')

const initialAssets = JSON.parse(initialAssetsString)

const stylesLookup = loadSerializedLookup(initialAssets)

export default async function serverRender(req: Request, res, next) {
  const markupApp = renderToString(<RootDev url={req.url} />)

  const css = getCriticalRules(markupApp, stylesLookup)

  // Process your CSS with postcss-css-variables
  const criticalCss = postcss([cssvariables({ preserve: false })]).process(css).css

  const markup = renderToString(<Html criticalCss={criticalCss} markupApp={markupApp} />)

  res.statusCode = 200
  res.setHeader('Content-type', 'text/html')
  res.write(`<!DOCTYPE html>${markup}`)
  res.send()

  next()
}

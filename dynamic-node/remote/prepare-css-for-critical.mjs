import postcss from 'postcss'
import fs from 'fs'
import cssvariables from 'postcss-css-variables'
import { extname, join, relative, basename } from 'path'

import scanDirectory from 'scan-directory'

// const scanDirectory2 = require('scan-directory')
// console.log('🚀 ~ scanDirectory2:', scanDirectory2)

const pathServer = `${process.cwd()}/dist/server`
const pathClient = `${process.cwd()}/dist/client`
const pathForCritical = `${process.cwd()}/dist/server/critical-css`

const pathCss = `${process.cwd()}/dist/client/588.8ff7816e.chunk.css`

const scan = async () => {
  const RESOLVE_EXTENSIONS = ['.css']

  const resultScan = await scanDirectory.default(pathClient, undefined, () => false)

  const result = resultScan
    .filter((name) => RESOLVE_EXTENSIONS.indexOf(extname(name)) >= 0)
    .map((file) => basename(file))
    .sort()

  return result
}

const convertCssFile = async (pathCss) => {
  const css = fs.readFileSync(`${pathClient}/${pathCss}`, 'utf8')

  // console.log('🚀 ~ convertCssFile ~ css:', css)
  const criticalCss = postcss([cssvariables({ preserve: false })]).process(css).css
  // console.log('🚀 ~ convertCssFile ~ criticalCss:', criticalCss)

  fs.writeFileSync(`${pathForCritical}/${pathCss}`, JSON.stringify(criticalCss))
}
const removeConvertAllCssFiles = async () => {
  if (!fs.existsSync(pathForCritical)) {
    fs.mkdirSync(pathForCritical)
  }

  const allCssFiles = await scan()

  allCssFiles.forEach((path) => {
    convertCssFile(path)
  })
}

await removeConvertAllCssFiles()

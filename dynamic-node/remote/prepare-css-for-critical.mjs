import postcss from 'postcss'
import fs from 'fs'
import cssvariables from 'postcss-css-variables'
import { extname, join, relative, basename } from 'path'

import scanDirectory from 'scan-directory'

const pathServer = `${process.cwd()}/dist/server`
const pathClient = `${process.cwd()}/dist/client`
const pathForCritical = `${process.cwd()}/dist/server/critical-css`

const pathCss = `${process.cwd()}/dist/client/588.8ff7816e.chunk.css`

const getCssFile = (pathCss) => fs.readFileSync(`${pathClient}/${pathCss}`, 'utf8')

const scan = async () => {
  const RESOLVE_EXTENSIONS = ['.css']

  const resultScan = await scanDirectory.default(pathClient, undefined, () => false)

  const result = resultScan
    .filter((name) => RESOLVE_EXTENSIONS.indexOf(extname(name)) >= 0)
    .map((file) => basename(file))
    .sort()

  return result
}
const createAllTokensToOneFile = async (allCssFiles) => {
  let global = ``

  allCssFiles.forEach((path) => {
    const css = getCssFile(path)

    const rootStyles = css.match(/:root{(.*?)}/g)

    if (rootStyles) {
      global = `${global}${rootStyles.join('')}`
    }
  })

  fs.writeFileSync(`${pathForCritical}/all-tokens.css`, global)

  return global
}

const convertCssFile = async (pathCss, globalFile) => {
  const css = getCssFile(pathCss)

  const criticalCss = postcss([cssvariables({ preserve: false })]).process([globalFile, css].join('')).css

  fs.writeFileSync(`${pathForCritical}/${pathCss}`, JSON.stringify(criticalCss))
}
const removeConvertAllCssFiles = async () => {
  if (!fs.existsSync(pathForCritical)) {
    fs.mkdirSync(pathForCritical)
  }

  const allCssFiles = await scan()

  const globalFile = await createAllTokensToOneFile(allCssFiles)

  allCssFiles.forEach((path) => {
    convertCssFile(path, globalFile)
  })
}

await removeConvertAllCssFiles()

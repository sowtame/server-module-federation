import postcss from 'postcss'
import fs from 'fs'
import cssvariables from 'postcss-css-variables'
import duplicates from 'postcss-discard-duplicates'
import { extname, join, relative, basename } from 'path'

import { globSync } from 'glob'

const pathServer = `${process.cwd()}/dist/server`
const pathClient = `${process.cwd()}/dist/client`
const pathForCritical = `${process.cwd()}/dist/server/critical-css`

const pathCss = `${process.cwd()}/dist/client/588.8ff7816e.chunk.css`

const getCssFile = (pathCss) => fs.readFileSync(`${pathClient}/${pathCss}`, 'utf8')

const scan = async () => {
  const resultScan = await globSync(`${pathClient}/*.css`)

  const result = resultScan.map((file) => basename(file))

  return result
}

const getAllTokens = async (allCssFiles) => {
  const global = []
  const clearRulesWhole = []

  allCssFiles.forEach((path) => {
    const css = getCssFile(path)

    const rootStyles = css.match(/:root\s*\{[^}]*\}/g)

    if (rootStyles) {
      rootStyles.forEach((rootStyle) => {
        if (!global.includes(rootStyle)) {
          global.push(rootStyle)
        }
      })
    }
  })

  // for debug
  // fs.writeFileSync(`${pathForCritical}/all-files-at-ones.css`, cssFile)

  return global.join('')
}

const convertCssFile = async (pathCss, globalFile) => {
  const css = getCssFile(pathCss)
  const clearRule = css.replace(/:root\s*\{[^}]*\}/g, '')
  const criticalCss = postcss([duplicates(), cssvariables({ preserve: false })]).process([globalFile, clearRule].join('')).css

  fs.writeFileSync(`${pathForCritical}/${pathCss}`, criticalCss)
}
const removeConvertAllCssFiles = async () => {
  if (fs.existsSync(pathForCritical)) {
    fs.rmdirSync(pathForCritical, { recursive: true, force: true })
  }
  fs.mkdirSync(pathForCritical)

  const allCssFiles = await scan()

  const globalFile = await getAllTokens(allCssFiles)

  allCssFiles.forEach((path) => {
    convertCssFile(path, globalFile)
  })
}

await removeConvertAllCssFiles()

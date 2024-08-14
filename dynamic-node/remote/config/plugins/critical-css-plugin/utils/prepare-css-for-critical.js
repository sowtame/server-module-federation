'use strict'

var _postcss = _interopRequireDefault(require('postcss'))
var _fs = _interopRequireDefault(require('fs'))
var _postcssCssVariables = _interopRequireDefault(require('postcss-css-variables'))
var _path = require('path')
var _scanDirectory = _interopRequireDefault(require('scan-directory'))
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e }
}
const pathServer = `${process.cwd()}/dist/server`
const pathClient = `${process.cwd()}/dist/client`
const pathForCritical = `${process.cwd()}/dist/server/critical-css`
const pathCss = `${process.cwd()}/dist/client/588.8ff7816e.chunk.css`
const getCssFile = (pathCss) => _fs.default.readFileSync(`${pathClient}/${pathCss}`, 'utf8')
const scan = async () => {
  const RESOLVE_EXTENSIONS = ['.css']
  const resultScan = await _scanDirectory.default(pathClient, undefined, () => false)
  const result = resultScan
    .filter((name) => RESOLVE_EXTENSIONS.indexOf((0, _path.extname)(name)) >= 0)
    .map((file) => (0, _path.basename)(file))
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

  // for debug
  // fs.writeFileSync(`${pathForCritical}/all-tokens.css`, global)

  return global
}
const convertCssFile = async (pathCss, globalFile) => {
  const css = getCssFile(pathCss)
  const criticalCss = (0, _postcss.default)([
    (0, _postcssCssVariables.default)({
      preserve: false,
    }),
  ]).process([globalFile, css].join('')).css
  _fs.default.writeFileSync(`${pathForCritical}/${pathCss}`, criticalCss)
}
const removeConvertAllCssFiles = async () => {
  if (!_fs.default.existsSync(pathForCritical)) {
    _fs.default.mkdirSync(pathForCritical)
  }
  const allCssFiles = await scan()
  const globalFile = await createAllTokensToOneFile(allCssFiles)
  allCssFiles.forEach((path) => {
    convertCssFile(path, globalFile)
  })
}

module.exports = removeConvertAllCssFiles

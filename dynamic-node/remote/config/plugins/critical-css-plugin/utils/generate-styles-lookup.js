'use strict'

var _usedStyles = require('used-styles')
var _indexNode = require('used-styles/dist/es5/index-node.js')
var _fs = require('fs')
const generateStylesLookup = async () => {
  const pathServer = `${process.cwd()}/dist/server`
  const pathStatic = `${pathServer}/critical-css`
  const stylesLookup = (0, _indexNode.discoverProjectStyles)(pathStatic)
  await stylesLookup
  ;(0, _fs.writeFileSync)(`${pathServer}/styles-lookup.json`, JSON.stringify((0, _usedStyles.serializeStylesLookup)(stylesLookup)))
}

module.exports = generateStylesLookup

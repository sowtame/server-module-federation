const removeConvertAllCssFiles = require('./utils/prepare-css-for-critical')
const generateStylesLookup = require('./utils/generate-styles-lookup')

const name = '@sowtame/critical-css'

class CrtiticalCssPlugin {
  applied = false

  constructor({ apply = true } = {}) {
    this.opts = { apply }

    // The Webpack compiler instance
    this.compiler = null
  }

  apply(compiler) {
    this.compiler = compiler

    compiler.hooks.assetEmitted.tap(name, async (compilation) => {
      if (!this.applied) {
        await removeConvertAllCssFiles()
        await generateStylesLookup()

        this.applied = true
      }
    })
  }
}

module.exports = CrtiticalCssPlugin

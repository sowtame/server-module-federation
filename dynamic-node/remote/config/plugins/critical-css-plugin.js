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

    compiler.hooks.assetEmitted.tap(name, (compilation) => {
      if (!this.applied) {
        this.applied = true
      }
    })
  }
}

module.exports = CrtiticalCssPlugin

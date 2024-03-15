const nodePath = require('path')
const fs = require('fs')
const makeDir = require('make-dir')

const name = '@loadable/webpack-plugin'

class CrtiticalCssPlugin {
  constructor({ filename = 'crititcal-css.json', path, writeToDisk = true, outputAsset = true } = {}) {
    this.opts = { filename, writeToDisk, outputAsset, path }

    // The Webpack compiler instance
    this.compiler = null
  }

  handleEmit = (compilation) => {
    const stats = compilation.getStats().toJson({
      all: false,
      assets: true,
      cachedAssets: true,
      chunks: false,
      publicPath: true,
    })

    stats.generator = 'critical-css-plugin'

    const onlyCss = stats.assets
      .filter(({ name }) => {
        if (name?.includes('.css')) {
          return true
        }
      })
      .map(({ name }) => `${stats.publicPath}${name}`)

    const result = JSON.stringify(onlyCss, null, 2)

    if (this.opts.writeToDisk) {
      this.writeAssetsFile(result)
    }

    if (this.opts.outputAsset) {
      return {
        source() {
          return result
        },
        size() {
          return result.length
        },
      }
    }

    return null
  }

  /**
   * Write Assets Manifest file
   * @method writeAssetsFile
   */
  writeAssetsFile = (manifest) => {
    const outputFolder = this.opts.writeToDisk.filename || this.compiler.options.output.path

    const outputFile = nodePath.resolve(outputFolder, this.opts.filename)

    try {
      if (!fs.existsSync(outputFolder)) {
        makeDir.sync(outputFolder)
      }
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err
      }
    }

    fs.writeFileSync(outputFile, manifest)
  }

  apply(compiler) {
    this.compiler = compiler

    if (this.opts.outputAsset || this.opts.writeToDisk) {
      compiler.hooks.make.tap(name, (compilation) => {
        compilation.hooks.processAssets.tap(
          {
            name,
            stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_REPORT,
          },
          () => {
            const asset = this.handleEmit(compilation)
            if (asset) {
              compilation.emitAsset(this.opts.filename, asset)
            }
          }
        )
      })
    }
  }
}

module.exports = CrtiticalCssPlugin
module.exports.default = CrtiticalCssPlugin

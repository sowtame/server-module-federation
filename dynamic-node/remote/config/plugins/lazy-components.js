const nodePath = require('path')
const fs = require('fs')
const makeDir = require('make-dir')

const name = '@loadable/webpack-plugin'

class LazyComponentsPlugin {
  constructor({ filename = 'lazy-components.json', path, writeToDisk, outputAsset = true } = {}) {
    this.opts = { filename, writeToDisk, outputAsset, path }

    // The Webpack compiler instance
    this.compiler = null
  }

  handleEmit = (compilation) => {
    const stats = compilation.getStats().toJson({
      all: false,
      assets: true,
    })

    stats.generator = 'lazy-components-plugin'

    const result = JSON.stringify(stats.assetsByChunkName, null, 2)

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

module.exports = LazyComponentsPlugin
module.exports.default = LazyComponentsPlugin

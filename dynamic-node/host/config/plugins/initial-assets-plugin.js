const nodePath = require('path')
const fs = require('fs')
const makeDir = require('make-dir')

/** @typedef {import('webpack').Compiler} Compiler */
/** @typedef {import('webpack').Compilation} Compilation */

const name = '@sowtame/initial-assets-plugin'

class InitialAssetsPlugin {
  constructor({ filename = 'initial-assets.json', path, writeToDisk = true, outputAsset = true } = {}) {
    this.opts = { filename, writeToDisk, outputAsset, path }

    // The Webpack compiler instance
    this.compiler = null
  }

  /**
   * Apply the plugin
   * @param {Compilation} compilation the compiler instance
   */
  getInitialChunks = (compilation) => {
    // compilation.chunkGroups.forEach((chunkGroup) => {
    //   console.log(chunkGroup.origins)
    // })
    return compilation.chunkGroups.reduce((acc, chunkGroup) => {
      // if (chunkGroup.name === 'index') {
      chunkGroup.chunks.forEach((chunk) => {
        // console.log(chunk)
        if (chunk) {
          chunk.getModules().forEach((mod) => {
            // console.log(mod)
            // console.log(mod.getChunks())
            // if (mod.resource.contains('core-components')) {
            // console.log(mod)
            // }
            if (mod.buildMeta.providedExports) {
              // console.log('1', mod.buildMeta.providedExports)
            }
          })
        }
      })
      acc[chunkGroup.name] = chunkGroup.chunks
      // }

      return acc
    }, {})
  }

  /**
   * Apply the plugin
   * @param {Compilation} compilation the compiler instance
   * @returns {void}
   */
  handleEmit = (compilation) => {
    const stats = compilation.getStats().toJson({
      all: false,
      assets: true,
      cachedAssets: true,
      chunks: true,
      chunkGroups: true,
      chunkGroupChildren: true,
      hash: true,
      ids: true,
      outputPath: true,
      publicPath: true,
      chunkRelations: true,
    })

    stats.generator = 'initial-assets-plugin'

    const entry = 'index'

    const otherLazyChunks = Object.keys(stats.namedChunkGroups).reduce((acc, key) => {
      const item = stats.namedChunkGroups[key]

      if (key !== entry) {
        acc = [...acc, ...item.chunks]
      }

      return acc
    }, [])

    const initialChunks = stats.chunks.reduce(
      (acc, chunk) => {
        if (chunk.runtime.includes(entry) && !otherLazyChunks.includes(chunk.id)) {
          chunk.files.forEach((file) => {
            if (file.includes('css')) {
              acc.css.push({
                src: `${stats.publicPath}${file}`,
              })
            } else {
              acc.js.push({
                src: `${stats.publicPath}${file}`,
              })
            }
          })
        }

        return acc
      },
      { js: [], css: [] }
    )

    const result = JSON.stringify(initialChunks, null, 2)

    // if (this.opts.writeToDisk) {
    //   this.writeAssetsFile(result, 'initial-assets.json')
    // }

    if (this.opts.writeToDisk) {
      const result = JSON.stringify(stats, null, 2)
      this.writeAssetsFile(result, 'initial-assets-all.json')
    }
    // if (this.opts.writeToDisk) {
    //   const result = this.getInitialChunks(compilation)
    //   const string = JSON.stringify(result, null, 2)
    //   this.writeAssetsFile(string, 'initial-assets-3.json')
    // }

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
  writeAssetsFile = (manifest, fileName) => {
    const outputFolder = this.opts.writeToDisk.filename || this.compiler.options.output.path

    const outputFile = nodePath.resolve(outputFolder, fileName)

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

  /**
   * Apply the plugin
   * @param {Compiler} compiler the compiler instance
   * @returns {void}
   */
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

    compiler.hooks.emit.tap(name, (compilation) => {
      const json = {}
      compilation.chunkGroups.forEach((chunkGroup) => {
        const chunkIds = chunkGroup.chunks.map((c) => c.id)
        chunkGroup.chunks.forEach((chunk) => {
          chunk.getModules().forEach((mod) => {
            // TODO: Hook into deps instead of the target module.
            // That way we know by the type of dep whether to include.
            // It also resolves conflicts when the same module is in multiple chunks.
            if (!/\.client\.js$/.test(mod.resource)) {
              return
            }
            const moduleExports = {}
            ;['', '*'].concat(mod.buildMeta.providedExports).forEach((name) => {
              moduleExports[name] = {
                id: mod.id,
                chunks: chunkIds,
                name: name,
              }
            })
            const href = pathToFileURL(mod.resource).href
            if (href !== undefined) {
              json[href] = moduleExports
            }
          })
        })
      })
      const output = JSON.stringify(json, null, 2)
      console.log('🚀 ~ compiler.hooks.emit.tap ~ output:', output)
    })
  }
}

module.exports = InitialAssetsPlugin
module.exports.default = InitialAssetsPlugin

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { throws } = require('assert')
const path = require('path')

const pluginName = 'CoreComponentsPathAliasPlugin'
const resolutionCacheMap = {}

/**
 * Плагин для webpack, который подменяет путь вида `@alfalab/core-components/{ComponentName}/{file}`
 * на `@alfalab/core-components/{ComponentName}/cssm/{file}`
 */
class CoreComponentsPathAliasPlugin {
  constructor(options) {
    this.folder = options.folder
    // https://regex101.com/r/PVShmI/4
    this.modulePathRegExp = /(@alfalab(?:[\\/])core-components(?:[\\/]))([\w-]+)(.+)*/
    this.modulePathRegExpExcept = /@alfalab(?:[\\/])core-components(?:[\\/])node_modules(?:[\\/])swiper(?:[\\/])*/
  }

  apply(compiler) {
    const { modulePathRegExp, modulePathRegExpExcept } = this

    compiler.hooks.normalModuleFactory.tap(pluginName, (nmf) => {
      // До того как модуль разрезолвится, подменяем ему путь
      nmf.hooks.beforeResolve.tapAsync(pluginName, (result, callback) => {
        if (!result) {
          return callback()
        }

        const filePath = result.request

        // Нас интересует путь `@alfalab/core-components`
        if (path.isAbsolute(filePath)) {
          return callback()
        }

        // Игнорируем темы и импорты переменных
        if (filePath.includes('@alfalab/core-components/themes') || filePath.includes('@alfalab/core-components/vars')) {
          return callback()
        }

        if (modulePathRegExpExcept.test(filePath)) {
          return callback()
        }

        // Если таковой нашелся - подменяем `@alfalab/core-components/{ComponentName}/{file}`
        // на `@alfalab/core-components/{ComponentName}/cssm/{file}`
        if (modulePathRegExp.test(filePath) && !filePath.includes(this.folder)) {
          // console.log(filePath);
          if (resolutionCacheMap[filePath]) {
            // eslint-disable-next-line no-param-reassign
            result.request = resolutionCacheMap[filePath]

            return callback()
          }

          if (path.extname(filePath) === '.css' && filePath.includes(`${path.sep}${this.folder}${path.sep}`)) {
            resolutionCacheMap[filePath] = filePath

            return callback()
          }

          const newFilePath = path.normalize(filePath.replace(modulePathRegExp, `$1$2${path.sep}${this.folder}${path.sep}$3`))

          resolutionCacheMap[filePath] = newFilePath
          // eslint-disable-next-line no-param-reassign
          result.request = newFilePath

          return callback()
        }

        return callback()
      })
    })
  }
}

module.exports = CoreComponentsPathAliasPlugin

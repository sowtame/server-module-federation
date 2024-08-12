const { createHash } = require('crypto')

function getCSSModuleLocalIdent(context, localName, lib) {
  let resourcePath = context.resourcePath

  const containsAlfLib = /@alfalab|@alfa-bank/g.test(context.resourcePath)

  console.log('context.resourcePath', context.resourcePath)

  if (containsAlfLib) {
    // const containsAlfLibWithCsmm = /moderncssm|csmm|esm/.test(context.resourcePath)
    resourcePath = String(context.resourcePath).replace(/moderncssm|csmm|esm/g, '')

    // if (containsAlfLibWithCsmm) {
    // }
  }

  const folder = context.resourcePath.split('/')
  const folderName = folder[folder.length - 2].replace(lib, 'core-components')

  const hash = createHash('md5')
  hash.update(Buffer.from(resourcePath + localName, 'utf8'))
  const localIdentHash = hash
    .digest('base64')
    // Remove all leading digits
    .replace(/^\d+/, '')
    // Replace all slashes with underscores (same as in base64url)
    .replace(/\//g, '_')
    // Remove everything that is not an alphanumeric or underscore
    .replace(/[^A-Za-z0-9_]+/g, '')
    .slice(0, 5)

  return `${folderName}__${localName}--${localIdentHash}`
}

module.exports = getCSSModuleLocalIdent

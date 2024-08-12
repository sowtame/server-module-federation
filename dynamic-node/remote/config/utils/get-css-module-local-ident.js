const { createHash } = require('crypto')

function getCSSModuleLocalIdent(context, localName) {
  let resourcePath = context.resourcePath

  const containsAlfLib = /@alfalab|@alfa-bank/g.test(context.resourcePath)

  if (containsAlfLib) {
    resourcePath = String(context.resourcePath).replace(/moderncssm\/|cssm\/|esm\//, '')
  }

  const resourceArray = context.resourcePath.split('/')

  // Бывают кейсы, когда стили из рут папки и папка у такого является moderncssm|cssm|esm подменяем такие кейсы
  const folderName = resourceArray[resourceArray.length - 2].replace(/moderncssm|cssm|esm/, 'alfa-components')

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

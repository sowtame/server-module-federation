import { serializeStylesLookup } from 'used-styles'
import { discoverProjectStyles } from 'used-styles/dist/es5/index-node.js'
import { writeFileSync } from 'fs'

const generateStylesLookup = async () => {
  const pathServer = `${process.cwd()}/dist/server`
  const pathStatic = `${pathServer}/critical-css`

  const stylesLookup = discoverProjectStyles(pathStatic)

  await stylesLookup

  writeFileSync(`${pathServer}/styles-lookup.json`, JSON.stringify(serializeStylesLookup(stylesLookup)))
}

await generateStylesLookup()

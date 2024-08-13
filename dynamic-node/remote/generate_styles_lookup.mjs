// project/scripts/generate_styles_lookup.mjs
import { serializeStylesLookup } from 'used-styles'
// import { discoverProjectStyles } from 'used-styles/node'
import { discoverProjectStyles } from 'used-styles/dist/es5/index-node.js'
import { writeFileSync } from 'fs'

const generate = async () => {
  const path = `${process.cwd()}/dist/client`
  const pathServer = `${process.cwd()}/dist/server`

  const stylesLookup = discoverProjectStyles(path)

  await stylesLookup

  writeFileSync(`${pathServer}/styles-lookup.json`, JSON.stringify(serializeStylesLookup(stylesLookup)))
}

await generate()

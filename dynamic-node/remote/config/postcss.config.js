const postcssCustomProperties = require('postcss-custom-properties')
const postcssGlobalData = require('@csstools/postcss-global-data')
const cssvariables = require('postcss-css-variables')
const postcssmixins = require('postcss-mixins')
const postcssImport = require('postcss-import')

module.exports = {
  plugins: [
    postcssImport(),
    postcssmixins(),
    // postcssGlobalData({
    //   files: ['src/client/root/styles.css'],
    // }),
    // cssvariables({
    //   preserve: false,
    // }),
    // postcssCustomProperties({ preserve: false }),
    // postcssDiscardDuplicates(),
  ],
}

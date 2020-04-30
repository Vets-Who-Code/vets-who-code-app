const fs = require('fs')
// const chalk = require('chalk')
const install = require('./install')

const log = (...args) => console.log(...args)

async function resetConfig() {
  const contentfulRichTextRender = '@contentful/rich-text-react-renderer'
  const gatsbySourceContentful = 'gatsby-source-contentful'
  const templatePackageJson = fs.readFileSync('./package.json')
  const parsedPkgJson = JSON.parse(templatePackageJson)
  const updatedDependencies = parsedPkgJson.dependencies

  if (
    !updatedDependencies.hasOwnProperty(contentfulRichTextRender) &&
    !updatedDependencies.hasOwnProperty(gatsbySourceContentful)
  ) {
    log('\x1b[42m\x1b[30m%s\x1b[0m', ' INFO ', '\x1b[32m', '🤖 Dependencies not preset skipping')
    return
  }

  delete updatedDependencies[contentfulRichTextRender]
  delete updatedDependencies[gatsbySourceContentful]

  parsedPkgJson.dependencies = updatedDependencies

  fs.writeFileSync(`./package.json`, JSON.stringify(parsedPkgJson, null, 2), 'utf-8')

  try {
    log()
    log('\x1b[42m\x1b[30m%s\x1b[0m', ' INFO ', '\x1b[36m\x1b[0m', '🤖 Cleaning up!')
    await install()
    log()
  } catch (err) {
    console.log('err:', err)
  }
}

module.exports = { resetConfig }

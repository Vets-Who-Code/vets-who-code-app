const fs = require('fs-extra')
const chalk = require('chalk')
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
    log(chalk.green('🤖 Dependencies not preset skipping'))
    return
  }

  delete updatedDependencies[contentfulRichTextRender]
  delete updatedDependencies[gatsbySourceContentful]

  parsedPkgJson.dependencies = updatedDependencies

  fs.writeFileSync(`./package.json`, JSON.stringify(parsedPkgJson, null, 2), 'utf-8')

  try {
    log()
    log(`${chalk.green('🤖 Cleaning up!')} `)
    await install()
    log()
  } catch (err) {
    console.log('err:', err)
    log(chalk.red('FAILED to add and commit package.json'))
  }
}

module.exports = { resetConfig }

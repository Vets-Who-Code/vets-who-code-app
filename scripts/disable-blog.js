const fs = require('fs-extra')
const chalk = require('chalk')

function resetConfig() {
  const basePath = './scripts/templates'

  if (
    fs.existsSync('./src/templates/blog-post-template.js') &&
    fs.existsSync('./src/templates/blog-template.js')
  ) {
    fs.copyFileSync('./src/templates/blog-post-template.js', `${basePath}/blog-post-template.js`)
    fs.copyFileSync('./src/templates/blog-template.js', `${basePath}/blog-template.js`)
    fs.unlinkSync('./src/templates/blog-post-template.js')
    fs.unlinkSync('./src/templates/blog-template.js')
  }

  const templatePackageJson = fs.readFileSync('./package.json')
  const parsedPkgJson = JSON.parse(templatePackageJson)
  const updatedDependencies = parsedPkgJson.dependencies

  delete updatedDependencies['@contentful/rich-text-react-renderer']
  delete updatedDependencies['gatsby-source-contentful']

  parsedPkgJson.dependencies = updatedDependencies

  fs.writeFileSync(`./package.json`, JSON.stringify(parsedPkgJson, null, 2), 'utf-8')

  console.log()
  console.log(`${chalk.green('🤖 Cleaning up and checking in blog template files.')} `)
  console.log()
}

module.exports = { resetConfig }

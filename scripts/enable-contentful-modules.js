const fs = require('fs')
const install = require('./install.js')

async function enableContentfulContent() {
  const templatePackageJson = fs.readFileSync(`./package.json`)
  const parsedPkgJson = JSON.parse(templatePackageJson.toString())
  /**
   * Update version of dependencies here.
   */
  const updatedDependencies = {
    ...parsedPkgJson.dependencies,
    '@contentful/rich-text-react-renderer': '14.1.1',
    'gatsby-source-contentful': '2.3.47',
  }

  parsedPkgJson.dependencies = updatedDependencies

  fs.writeFileSync(`./package.json`, JSON.stringify(parsedPkgJson, null, 2), 'utf-8')

  if (process.env.CI || process.env.CD) {
    await install()
  }
}

module.exports = { enableContentfulContent }

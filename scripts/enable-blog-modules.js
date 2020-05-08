const fs = require('fs')
const install = require('./install.js')

async function enableBlog() {
  const templatePackageJson = fs.readFileSync(`./package.json`)
  const parsedPkgJson = JSON.parse(templatePackageJson)
  /**
   * Update version of dependencies here.
   */
  const updatedDependencies = {
    ...parsedPkgJson.dependencies,
    '@contentful/rich-text-react-renderer': '13.4.0',
    'gatsby-source-contentful': '2.3.3',
  }

  parsedPkgJson.dependencies = updatedDependencies

  fs.writeFileSync(`./package.json`, JSON.stringify(parsedPkgJson, null, 2), 'utf-8')
  await install()
}

enableBlog()

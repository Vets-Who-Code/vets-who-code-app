const fs = require('fs-extra')

function enableBlog() {
  const basePath = './scripts/templates'

  fs.copyFileSync(`${basePath}/blog-post-template.js`, './src/templates/blog-post-template.js')
  fs.copyFileSync(`${basePath}/blog-template.js`, './src/templates/blog-template.js')

  const templatePackageJson = fs.readFileSync(`./package.json`)
  const parsedPkgJson = JSON.parse(templatePackageJson)
  const updatedDependencies = {
    ...parsedPkgJson.dependencies,
    '@contentful/rich-text-react-renderer': '13.4.0',
    'gatsby-source-contentful': '2.1.92',
  }

  parsedPkgJson.dependencies = updatedDependencies

  fs.writeFileSync(`./package.json`, JSON.stringify(parsedPkgJson, null, 2), 'utf-8')
}

enableBlog()

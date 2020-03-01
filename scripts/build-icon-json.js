const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const svgAssetDirPath = path.resolve(__dirname, '../external-assets/svgs')
const { parseSync } = require('svgson')
const log = console.log

/**
 * This script builds a json object from **font-awesome** svg files.
 * To add new icons drop the font-awesome-svg file into external-assets/svgs.
 * Run `yarn gen:icon`
 * This builds icons available for use with the Icon component.
 * Will write/update iconMap.json file with the following structure:
 * ```
 *  {
 *    iconName: {
 *       path: '',
 *       viewBox: ''
 *     }
 *  }
 * ```
 */
function buildIconJson() {
  log()
  const svgToObj = {}
  const svgFiles = fs.readdirSync(svgAssetDirPath)

  for (let svgFile of svgFiles) {
    console.log(`Processing file ${chalk.bold.yellow(svgFile)}`)
    const svgFileContent = fs.readFileSync(`${svgAssetDirPath}/${svgFile}`, 'utf-8')
    const parsedSvg = parseSync(svgFileContent)
    const iconName = parsedSvg.attributes['data-icon']
    if (!svgToObj[iconName]) {
      svgToObj[iconName] = iconName
    }

    if (Array.isArray(parsedSvg.children)) {
      for (let child of parsedSvg.children) {
        svgToObj[iconName] = {
          path: child.attributes.d,
          viewBox: parsedSvg.attributes.viewBox,
        }
      }
    }
  }

  fs.writeFileSync('src/components/Icon/iconMap.json', JSON.stringify(svgToObj, null, 2))

  log(`\n${chalk.bold.green('Successfully')} built json file for Icon component  🙌`)
}

buildIconJson()

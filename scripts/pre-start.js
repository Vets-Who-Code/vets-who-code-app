require('dotenv').config()
const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer')
const runAll = require('npm-run-all')
const { log } = require('./helpers')

const args = process.argv.slice(2)

const envFilePath = path.resolve(process.cwd(), '.env')
const envFile = fs.existsSync(envFilePath)
const envFileBuffer = fs.readFileSync(envFilePath)
const envFileConent = envFileBuffer.toString()

function runCommands(commandList) {
  const { stdout, stderr } = process

  runAll(commandList, {
    parallel: false,
    stdout,
    stderr,
  })
    .then(() => {
      console.log('done!')
    })
    .catch(err => {
      console.log('failed!', err)
    })
}

function printHelp() {
  log(`
Options:
  -b, --blog                Enable blog
  -h, --help                Show help
  `)
}

const options = {
  '-h': printHelp,
  '-b': () => {
    log('RUN BLOG BLOCK')
    runCommands(['enable:blog', 'yarn:install', 'gatsby:develop'])
  },
}

if (args.indexOf('-h') > -1 || args.indexOf('--help') > -1) {
  options['-h']()
} else if (args.length > 0) {
  if (!envFile) {
    inquirer
      .prompt([
        {
          type: 'confirm',
          name: 'hasContentfulKeys',
          message: 'Have you obtained the contentful API keys?',
        },
      ])
      .then(async answers => {
        if (!answers.hasContentfulKeys) {
          log()
          log(
            chalk.yellow.inverse(' INFO '),
            'Please reach out in the #product channel in slack and request the API keys\n'
          )
          process.exit(1)
        } else {
          const { spaceId, accessToken } = await inquirer.prompt([
            {
              type: 'input',
              name: 'spaceId',
              message: 'Please paste in the Contentful Space ID key here',
            },
            {
              type: 'input',
              name: 'accessToken',
              message: 'Please paste in the Contentful Access Token here',
            },
          ])

          fs.writeFileSync(envFilePath, `\nDISPLAY_BLOG=true`)
          fs.appendFileSync(envFilePath, `\nCONTENTFUL_SPACE_ID=${spaceId}`)
          fs.appendFileSync(envFilePath, `\nCONTENTFUL_ACCESS_TOKEN=${accessToken}`)

          options['-b']()
        }
      })
  } else if (args.indexOf('-b') > -1 || (args.indexOf('--blog') > -1 && envFile)) {
    if (/^#\s?DISPLAY_BLOG/.test(envFileConent) || !/DISPLAY_BLOG/.test(envFileConent)) {
      console.log(
        chalk.red.inverse('[ERROR]'),
        'Please add or enable DISPLAY_BLOG=true to your .env file \n'
      )
      process.exit(1)
    } else {
      options['-b']()
    }
  }
} else {
  if (/^(?!#)DISPLAY_BLOG=true/gm.test(envFileConent)) {
    console.log(
      '\n',
      chalk.red.inverse('[ERROR]'),
      'Please remove or disable DISPLAY_BLOG=true from your .env file \n'
    )
    process.exit(1)
  } else {
    runCommands(['gatsby:develop'])
  }
}

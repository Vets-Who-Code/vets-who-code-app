require('dotenv').config()
const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer')
const runAll = require('npm-run-all')
const { log } = require('./helpers')

const args = process.argv.slice(2)

function runCommands(commandList) {
  runAll(commandList, {
    parallel: false,
    stdout: process.stdout,
    stderr: process.stderr,
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
  -i, --ignore              Skip CLI and start app based on your current environment configuration
  -s, --shop                Enable shopify shop
  `)
}

const options = {
  '-h': printHelp,
  '-i': () => {
    log('IGNORE BLOCK')
    runCommands(['gatsby:develop'])
  },
  '--ignore': () => {
    log('IGNORE BLOCK')
    runCommands(['gatsby:develop'])
  },
  '-b': () => {
    log('RUN BLOG BLOCK')
    runCommands(['enable:blog', 'yarn:install', 'gatsby:develop'])
  },
  '--blog': () => {
    log('RUN BLOG BLOCK')
    runCommands(['enable:blog', 'yarn:install', 'gatsby:develop'])
  },
  '-s': () => {
    log('RUN SHOP BLOCK')
    // runCommands(['enable:shop', 'yarn:install', 'gatsby:develop'])
  },
  '--shop': () => {
    log('RUN SHOP BLOCK')
    // runCommands(['enable:shop', 'yarn:install', 'gatsby:develop'])
  },
}

if (args.indexOf('-i') > -1 || args.indexOf('--ignore') > -1) {
  options['-i']()
} else if (args.indexOf('-h') > -1 || args.indexOf('--help') > -1) {
  options['-h']()
} else if (args.length > 0) {
  for (let arg of args) {
    options[arg]()
  }
} else {
  const initialQuestions = [
    {
      type: 'confirm',
      name: 'enableBlog',
      message: 'Do you want to enable the blog?',
    },
    // {
    //   type: 'confirm',
    //   name: 'enableShop',
    //   message: 'Do you want to enable the shopify store?',
    // },
  ]

  log(`🤖 Welcome I am here to help you set up your environment.\n
      Run yarn develop -h or yarn develop --help\n
    `)

  inquirer
    .prompt(initialQuestions)
    .then(async answers => {
      const envFilePath = path.resolve('./', '.env')
      const envFile = fs.existsSync(envFilePath)

      if ((answers.enableBlog && !envFile) || (answers.enableShop && !envFile)) {
        log()
        log('Looks like your .env file has not been configured yet. Let me help with that.')
        log()

        const { hasContentfulKeys } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'hasContentfulKeys',
            message: 'Have you obtained the contentful API keys?',
          },
        ])

        if (!hasContentfulKeys) {
          log()
          log(
            chalk.yellow.inverse(' INFO '),
            'Please reach out in the #product channel in slack and request the API keys\n'
          )
          process.exit(1)
        }

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

        if (answers.enableBlog) {
          fs.appendFileSync(envFilePath, `\nDISPLAY_BLOG=true`)
          fs.appendFileSync(envFilePath, `\nCONTENTFUL_SPACE_ID=${spaceId}`)
          fs.appendFileSync(envFilePath, `\nCONTENTFUL_ACCESS_TOKEN=${accessToken}`)
          // enable contentful modules
          log(chalk.green.inverse(' ENABLING CONTENTFUL MODULES '))
          runCommands(['enable:blog'])
        }
        // if (answers.enableShop) {
        //   log(chalk.green.inverse(' ENABLING SHOPIFY MODULES '))
        //   // enable shopify modules
        // }
      }

      if (process.env.DISPLAY_BLOG && !answers.enableBlog) {
        log()
        log()
        log(chalk.red.inverse(' ERROR '), 'Invalid environment configuration\n')
        log(chalk.yellow.inverse(' INFO '), 'Please check your .env file is configured properly\n')
        log()
        process.exit(1)
      }
      // if (!process.env.DISPLAY_SHOP && answers.enableShop) {
      //   log()
      //   log()
      //   log(chalk.red.inverse(' ERROR '), 'Invalid environment configuration\n')
      //   log(chalk.yellow.inverse(' INFO '), 'Please check your .env file is configured properly\n')
      //   log()
      //   process.exit(1)
      // }

      if (answers.enableBlog && envFile) {
        log(chalk.green.inverse(' HANDLE CASE HERE FOR WHEN USER HAS ALREADY SET UP .ENV '))
        runCommands(['enable:blog'])
      }

      log(chalk.green.inverse(' RUNNING APP '))
      runCommands(['yarn:install', 'gatsby:develop'])
    })
    .catch(error => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else when wrong
        console.log('error:', error)
      }
    })
}

// const exitProcess = signal => {
//   console.log(' SIGNAL: ', signal)
//   // console.log(' killing', processes.length, 'child processes')
//   // processes.forEach(child => {
//   //   child.kill()
//   // })
//   process.exit()
// }

// process.on('uncaughtException', exitProcess)
// process.on('SIGINT', exitProcess)
// process.on('SIGTERM', exitProcess)

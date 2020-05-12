require('dotenv').config()
const chalk = require('chalk')
const inquirer = require('inquirer')
const { log } = require('./helpers')
const spawn = require('cross-spawn-with-kill')

const { enableBlog } = require('./enable-blog-modules')
// const { develop } = require('./develop')
// const install = require('./install')

const [skipPrompts] = process.argv.slice(2)

if (skipPrompts === '--skip' || skipPrompts === '-s') {
  develop()
} else {
  inquirer
    .prompt([
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
    ])
    .then(async answers => {
      // log('answers:', answers)
      if (process.env.DISPLAY_BLOG && !answers.enableBlog) {
        log('Looks like you have set DISPLAY_BLOG to true')
        log('Please comment out or remove the DISPLAY_BLOG environment variable in your .env file')
        process.exit(1)
      }
      if (!process.env.DISPLAY_BLOG && answers.enableBlog) {
        log()
        log()
        log(chalk.red.inverse(' ERROR '), 'Looks like your were trying to enable the blog\n')
        log(chalk.yellow.inverse(' INFO '), 'Please check your .env file is configured properly\n')
        log()
        process.exit(1)
      }

      if (answers.enableBlog) {
        log(chalk.green.inverse(' RUNNING WITH BLOG '))
        // enable contentful modules
        await enableBlog()
      }
      if (answers.enableShop) {
        log(chalk.green.inverse(' RUNNING WITH WITH SHOP '))
        // enable shopify modules
      }
      spawn('yarn', { stdio: 'inherit', shell: true })
      spawn('gatsby', ['develop'], { stdio: 'inherit', shell: true })
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

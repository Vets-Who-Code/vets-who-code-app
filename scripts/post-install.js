const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const { log } = require('./helpers')

function setupEnvFile() {
  if (fs.existsSync('.env')) {
    log(chalk.blue.inverse('\n .env configured skipping post-install step \n'))
    return
  }

  const envExampleFile = path.resolve('.env.example')
  fs.copyFileSync(envExampleFile, '.env')
  log(chalk.green.inverse('\n configured .env file \n'))
}

setupEnvFile()

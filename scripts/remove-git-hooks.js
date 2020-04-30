const fs = require('fs-extra')
const chalk = require('chalk')

function cleanGitHooksDir() {
  const gitHooksDirPath = `${process.cwd()}/.git/hooks`

  const gitHooksFiles = fs.readdirSync(gitHooksDirPath)
  let filePath

  for (let file of gitHooksFiles) {
    if (!file.endsWith('.sample')) {
      filePath = `${gitHooksDirPath}/${file}`
      console.log(chalk.red(`[REMOVING]:`), filePath)
      fs.unlinkSync(filePath)
    }
  }
}

cleanGitHooksDir()

module.exports = cleanGitHooksDir

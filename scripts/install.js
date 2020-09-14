const util = require('util')

const isWin = process.platform === 'win32'

/**
 * using child_process here so that modules
 * do not have to be installed in CI environment
 */
let spawn

if (isWin) {
  spawn = util.promisify(require('cross-spawn-with-kill'))
} else {
  spawn = util.promisify(require('child_process').spawn)
}

async function install() {
  try {
    await spawn('yarn', ['install'], { stdio: 'inherit', shell: true })
  } catch (err) {
    console.log(err.message)
    process.exit(1)
  }
}

module.exports = install

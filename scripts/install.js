const util = require('util')
const spawn = util.promisify(require('child_process').spawn)

async function install() {
  try {
    await spawn('yarn', ['install'], { stdio: 'inherit' })
  } catch (err) {
    console.log(err.message)
    process.exit(1)
  }
}

module.exports = install

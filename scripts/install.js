const execa = require('execa')

async function install() {
  const installDeps = await execa('yarn', { stdio: 'inherit' })
  if (installDeps.failed) {
    return Promise.reject(new Error('Failed to add package.json'))
  }
}

module.exports = install

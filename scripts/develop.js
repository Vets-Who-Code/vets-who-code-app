const spawn = require('cross-spawn-with-kill')

async function develop() {
  try {
    await spawn('gatsby', ['develop'], { stdio: 'inherit', shell: true })
  } catch (err) {
    console.log(err.message)
    process.exit(1)
  }
}

module.exports = { develop }

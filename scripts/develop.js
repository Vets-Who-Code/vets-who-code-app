const spawn = require('cross-spawn-with-kill')
const { resetConfig } = require('./disable-blog-modules.js')

const developProcess = spawn('gatsby', ['develop'], { stdio: 'inherit', shell: true })

process.on('SIGINT', () => {
  developProcess.kill()
  resetConfig()
  process.exit()
})

const express = require('express')
const app = express()

app
  .use(express.static('public'))
  /*
   * .use((err, req, res, next) => {
   *   res.status(404).sendFile(`${__dirname}/HTML/404.html`)
   * })
   */

  .use((err, req, res, next) => {
    res.status(err.status)
    res.render('Error', {
      message: err.message,
      error: app.get('env') === 'development' ? err : {},
      title: 'Error'
    })
  })

module.exports = app

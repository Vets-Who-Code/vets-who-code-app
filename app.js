const debug = require('debug')('app')
const express = require('express')
const app = express()

app
  .set('port', process.env.PORT || 4000)
  .use(express.static('HTML'))

  /*
   * .use((err, req, res, next) => {
   *   res.status(404).sendFile(`${__dirname}/HTML/404.html`)
   * })
   */

  .use((err, req, res, next) => {
    res.status(err.status)
    res.render('Error', {
      message: err.message,
      error: (app.get('env') === 'development') ? err : {}
    })
  })

  .listen(app.get('port'), () => debug(`Listening on ${app.get('port')}`))

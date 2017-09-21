const http = require('http')
const assert = require('assert')
require('../app')

describe('VetsWhoCode\'s website', () => {
  it('should respond with a 200 status code', done => {
    http.get('http://127.0.0.1:3000', response => {
      assert.equal(200, response.statusCode)
      done()
    })
  })
})

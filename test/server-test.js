const assert  = require('chai').assert
const app     = require('../server')
const request = require('request')
const pry     = require('pryjs')

describe('Server', function() {
  before( function(done){
    this.port = 9001

    this.server = app.listen(this.port, function(error, result) {
      if (error) { return done(error) }
      done()
    })

    this.request = request.defaults({
      baseUrl: 'http://localhost:9001/'
    })
  })

  after( function() {
    this.server.close()
  })

  it('Should exist', function(done){
    assert(app)
    done()
  })

  describe('GET /', function() {
    it('should return a 200', function(done){
      this.request.get('/', function(error, response) {
        if (error) { done(error) }
        assert.notEqual(response.statusCode, 404)
        assert.equal(response.statusCode, 200)
        done()
      })
    })
  })
})

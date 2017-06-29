const assert  = require('chai').assert
const app     = require('../server')
const request = require('request')
const User    = require('../lib/models/user')
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

  describe('GET /users', function() {
    this.timeout(10000)

    beforeEach( function(done){
      User.create("Jarvan IV")
        .then( function() { done() })
    })

    afterEach( function(done){
      User.destroyAll()
        .then( function() { done() })
    })

    it('should return a 404 if the resource is not found', function(done){
      this.request.get('/users/200', function(error, response) {
        if (error) { done(error) }
        assert.equal(response.statusCode, 404)
        done()
      })
    })

    it('should have the id and message from the resource', function(done){
      let ourRequest = this.request
      User.first()
        .then( function(data) {
          let id = data.rows[0].id
          let name = data.rows[0].name
          let created_at = data.rows[0].created_at

          ourRequest.get(`/users/${id}`, function(error, response) {
            if (error) { done(error) }
            // eval(pry.it)
            let parsedSecret = JSON.parse(response.body)

            assert.equal(parsedSecret.id, id)
            assert.equal(parsedSecret.name, name)
            assert.ok(parsedSecret.created_at, created_at)
            done()
          })
        })
    })
  })
})

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

  describe('GET /api/v1/users/:id', function() {
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
      this.request.get('/api/v1/users/200', function(error, response) {
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

          ourRequest.get(`/api/v1/users/${id}`, function(error, response) {
            if (error) { done(error) }
            let parsedUser = JSON.parse(response.body)

            assert.equal(parsedUser.id, id)
            assert.equal(parsedUser.name, name)
            assert.ok(parsedUser.created_at, created_at)
            done()
          })
        })
    })
  })
  describe('POST /api/v1/users', function() {
    this.timeout(10000)

    afterEach( function(done){
      User.destroyAll()
        .then( function() { done() })
    })

    it('should not return a 404', function(done){
      this.request.post('/api/v1/users', function(error, response) {
        if (error) { done(error) }

        assert.notEqual(response.statusCode, 404)
        done()
      })
    })

    it('should receive and store data', function(done){
      let name = {name: 'Brett'}
      this.request.post('/api/v1/users', {form: name}, function(error, response) {
        if (error) { done(error) }

        let parsedUser = JSON.parse(response.body)
        assert.equal(parsedUser.id, id)
        assert.equal(parsedUser.name, name)
        assert.ok(parsedUser.created_at, created_at)
        done()
      })
    })
  })
})

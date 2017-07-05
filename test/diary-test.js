const assert  = require('chai').assert
const app     = require('../server')
const request = require('request')
const Diary   = require('../lib/models/diary')
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

  describe('GET /api/v1/diary/:id', function() {
    this.timeout(10000)

    beforeEach( function(done){
      Diary.create("Jarvan IV")
        .then( function() { done() })
    })

    afterEach( function(done){
      Diary.destroyAll()
        .then( function() { done() })
    })

    it('should return a 404 if the resource is not found', function(done){
      this.request.get('/api/v1/diary/200', function(error, response) {
        if (error) { done(error) }
        assert.equal(response.statusCode, 404)
        done()
      })
    })

    it('should have the id and message from the resource', function(done){
      let ourRequest = this.request
      Diary.first()
        .then( function(data) {
          let id = data.rows[0].id
          let name = data.rows[0].name
          let created_at = data.rows[0].created_at

          ourRequest.get(`/api/v1/diary/${id}`, function(error, response) {
            if (error) { done(error) }
            let parsedDiary = JSON.parse(response.body)

            assert.equal(parsedDiary.id, id)
            assert.equal(parsedDiary.name, name)
            assert.ok(parsedDiary.created_at, created_at)
            done()
          })
        })
    })
  })
  describe('POST /api/v1/diary', function() {
    this.timeout(1000000)

    afterEach( function(done){
      Diary.destroyAll()
        .then( function() { done() })
    })

    it('should not return a 404', function(done){
      this.request.post('/api/v1/diary', function(error, response) {
        if (error) { done(error) }

        assert.notEqual(response.statusCode, 404)
        done()
      })
    })

    it('should receive and store data', function(done){
      let name = {name: 'Brett'}
      this.request.post('/api/v1/diary', {form: name}, function(error, response) {
        console.log(response.request.uri.href)
        
        if (error) { done(error) }

        let parsedDiary = response
        // console.log(parsedDiary);
        // console.log(Diary.findName(parsedDiary.name));
        // console.log();
        // assert.equal(parsedDiary.id, id)
        // assert.equal(parsedDiary, name)
        // assert.ok(parsedDiary.created_at, created_at)
        done()
      })
    })
  })
})

const assert  = require('chai').assert
const app     = require('../server')
const request = require('request')
const Food    = require('../lib/models/food')
const pry     = require('pryjs')

describe('Server', function(){
  before( function(done){
    this.port = 9001

    this.server = app.listen(this.port, function(error,result){
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

  describe('GET /api/v1/foods/:id', function() {
    this.timeout(1000000)

    beforeEach( function(done){
      Food.create('pizza', 100)
        .then( function(){ done() })
    })

    afterEach( function(done){
      Food.destroyAll()
        .then( function() { done() })
    })

    it('should return a 404 if the resource is not found', function(done){
      this.request.get('/api/v1/foods/200', function(error, response){
        if (error) { done(error) }
        assert.equal(response.statusCode, 404)
        done()
      })
    })

    it('should have the id, name and calories from the food', function(done){
      let ourRequest = this.request
      Food.first()
      .then( function(data) {
        let id = data.rows[0].id
        let name = data.rows[0].name
        let calories = data.rows[0].calories
        let created_at = data.rows[0].created_at

        ourRequest.get(`/api/v1/foods/${id}`, function(error, response){
          if (error) { done(error) }
          let parsedFood = JSON.parse(response.body)

          assert.equal(parsedFood.id, id)
          assert.equal(parsedFood.name, name)
          assert.equal(parsedFood.calories, calories)
          assert.ok(parsedFood.created_at, created_at)
          done()
        })
      })
    })
  })
})

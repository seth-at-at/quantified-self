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

  describe('GET /api/v1/foods', function() {
    this.timeout(1000000)

    beforeEach( function(done) {
      Food.create('pizza', 100)
      .then( function(){
        Food.create('banana', 50)
        .then( function(){ done() })
      })
    })

    afterEach( function(done) {
      Food.destroyAll()
      .then( function() { done() })
    })

// Shoud I test for a bad response?

    it('should have the id, name and calories from both foods', function(done){
      let ourRequest = this.request
      Food.all()
      .then( function(data) {
        let pizzaId = data.rows[0].id
        let pizzaName = data.rows[0].name
        let pizzaCalories = data.rows[0].calories
        let pizzaCreatedAt = data.rows[0].created_at
        let bananaId = data.rows[1].id
        let bananaName = data.rows[1].name
        let bananaCalories = data.rows[1].calories
        let bananaCreatedAt = data.rows[1].created_at

        ourRequest.get('/api/v1/foods', function(error, response){
          if (error) { done(error) }
          let parsedFood = JSON.parse(response.body)

          assert.equal(parsedFood[0].id, pizzaId)
          assert.equal(parsedFood[0].name, pizzaName)
          assert.equal(parsedFood[0].calories, pizzaCalories)
          assert.ok(parsedFood[0].created_at, pizzaCreatedAt)
          assert.equal(parsedFood[1].id, bananaId)
          assert.equal(parsedFood[1].name, bananaName)
          assert.equal(parsedFood[1].calories, bananaCalories)
          assert.ok(parsedFood[1].created_at, bananaCreatedAt)
          done()
        })
      })
    })

    describe('POST /api/v1/foods', function() {
      it('POSTs /api/v1/foods', function(done) {
        const food = { name: 'apple', calories: 20}
        const options = {
          method: 'POST',
          body: food,
          json: true,
          url: '/api/v1/foods'
        }

        const ourRequest = this.request(options, function(error, response, body) {
          if (error) { done(error) }

          assert.equal(body.name, 'apple')
          assert.equal(body.calories, 20)
          done()
        })
      })
    })

    describe('PUT /api/v1/foods/:id', function() {
      this.timeout(1000000)

      beforeEach( function(done) {
        Food.create('pizza', 100)
          .then( function(){ done() })
        })

      afterEach( function(done) {
        Food.destroyAll()
        .then( function() { done() })
      })

      it('updates the foods name and calories for a food', function(done) {
        const id = 1
        const food = { name: 'banana', calories: 10 }
        const options = {
          method: 'PUT',
          body: food,
          json: true,
          url: `/api/v1/foods/${id}`
        }
        const ourRequest = this.request(options, function(error, response, body) {
          if (error) { done(error) }
          assert.equal(body.name, 'banana')
          assert.equal(body.calories, 10)
          done()
        })
      })
    })

  })
})

const assert    = require('chai').assert
const app       = require('../server')
const request   = require('request')
const Food      = require('../lib/models/food')
const Diary     = require('../lib/models/diary')
const DiaryFood = require('../lib/models/diary_foods')
const pry       = require('pryjs')

describe('Food Endpoints', function(){
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
    it('updates the foods name', function(done) {
      const id = 1
      const food = { name: 'banana' }
      const options = {
        method: 'PUT',
        body: food,
        json: true,
        url: `/api/v1/foods/${id}`
      }
      const ourRequest = this.request(options, function(error, response, body) {
        if (error) { done(error) }
        assert.equal(body.name, 'banana')
        done()
      })
    })

    it('updates the calories count', function(done) {
      const id = 1
      const food = { calories: 15 }
      const options = {
        method: 'PUT',
        body: food,
        json: true,
        url: `/api/v1/foods/${id}`
      }
      const ourRequest = this.request(options, function(error, response, body) {
        if (error) { done(error) }
        assert.equal(body.calories, 15)
        done()
      })
    })
  })

  describe('POST /api/v1/foods', function() {
    beforeEach( function(done) {
      Diary.create('Breakfast').then( function(){ done() })
    })

    afterEach( function(done) {
      Diary.destroyAll()
        .then( function(){
      Food.destroyAll().then(function() { done() })
      })
    })

    it('POSTs /api/v1/foods', function(done) {
      let ourRequest = this.request
      let food = { name: 'apple', calories: 20, diary_name: 'Breakfast'}
      let options = {
        method: 'POST',
        body: food,
        json: true,
        url: '/api/v1/foods'
      }

      ourRequest.post(options, function(error, response, body) {
        if (error) { done(error) }

        assert.equal(body.name, 'apple')
        assert.equal(body.calories, 20)
        done()
      })
    })
  })

  describe('GET /api/v1/foods', function() {
    this.timeout(100000)
     beforeEach(function(done) {
       Food.create("Banana", 105)
       .then(function() {
         Food.create("French Silk Pie", 340).then(function() { done() })
       });
     })

     afterEach(function(done) {
       Food.destroyAll().then(function() {
         done()
       })
     })

     it('should have two food items from the resource', function(done) {
       this.request.get('/api/v1/foods', function(error, response) {
         if (error) { done(error) }
         var parsedFoods = JSON.parse(response.body)
         var food1 = parsedFoods[0]
         var food2 = parsedFoods[1]

         assert.equal(parsedFoods.length, 2)
         assert.equal(food1.id, 1)
         assert.equal(food1.name, "Banana")
         assert.equal(food1.calories, 105)
         assert.equal(food2.id, 2)
         assert.equal(food2.name, "French Silk Pie")
         assert.equal(food2.calories, 340)

         done()
       })
     })
   })
})

//     describe('DELETE /api/v1/foods/:id', function() {
//
//       beforeEach( function(done) {
//         Food.create('pizza', 100)
//           .then( function(){ done() })
//         })
//
//       afterEach( function(done) {
//         Food.destroyAll()
//         .then( function() { done() })
//       })
//
//       it('deletes the food from the database', function(done) {
//         const id = 1
//         const options = {
//           method: 'DELETE',
//           json: true,
//           url: `/api/v1/foods/${id}`
//         }
//         const ourRequest = this.request(options, function(error, response) {
//             if (error) { done(error) }
//             Food.all()
//             .then( (data) => {
//             assert.equal(response.statusCode, 200)
//             assert.equal(data.rowCount, 2)
//             done()
//           })
//         })
//     })
//   })

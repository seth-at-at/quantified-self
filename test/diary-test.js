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
      baseUrl: 'http://localhost:9001/api/v1'
    })
  })

  after( function() {
    this.server.close()
  })

  describe('methods', function(){
    beforeEach( function(done){
      Diary.create('test')
        .then(() => done());
    });

    afterEach( function(done){
      Diary.destroyAll().then(() => done());
    });
    // create: createDiary,
    // destroyAll: emptyDiarysTable,
    // find: find,
    // findFoodsFor: findFoodsFor,
    // all: all,
    // findByName: findByName
    it('Creates diary / #find', function(done){
      Diary.find(1)
        .then(function(data){
          assert.equal(data.rows[0].name, 'test')
        })
        done()
    })

    it('#all', function(done){
      Diary.create('test 2')
        .then(() => {
          Diary.all()
            .then(data => {
              assert.equal(data.rows.length, 2);
              assert.equal(data.rows[1].name, 'test 2');
              done();
            });
        });
    });

    it('destroys all existing diary entrees', function(){
      // Diary.create('test')
      // assert.equal(Diary.find(1).name, 'test')
      // Diary.destroyAll()
      // assert.equal(Diary.all, 0)
    })
  })

  describe('GET /diary/:id', function() {
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
      this.request.get('/diary/200', function(error, response) {
        if (error) { done(error) }
        assert.equal(response.statusCode, 404)
        done()
      })
    })

    it('should have the id and message from the resource', function(done){
      let ourRequest = this.request
      Diary.find(1)
        .then( function(data) {
          let id = data.rows[0].id
          let name = data.rows[0].name
          let created_at = data.rows[0].created_at
          ourRequest.get(`/diary/${id}`, function(error, response) {
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

  describe('POST /diary', function() {
    // this.timeout(1000000)

    afterEach( function(done){
      Diary.destroyAll()
        .then( function() { done() })
    })

    it('should not return a 404', function(done){
      this.request.post('/diary', function(error, response) {
        if (error) { done(error) }

        assert.notEqual(response.statusCode, 404)
        done()
      })
    })

    it('should receive and store data', function(done){
      let name = {name: 'Lunch'}
      let options = {
            method: 'POST',
            body: name,
            json: true,
            url: '/diary'
          };
      this.request.post(options, function(error, response, body) {
        if (error) { done(error) }

        assert.equal(body.name, name.name)
        done()
      })
    })
  })

  describe('diary', () => {
    beforeEach(function(done){
      Diary.create('breakfast')
        .then(() => {
          done()
        });
    });

      afterEach( function(done){
        Diary.destroyAll()
          .then( function() { done() })
      })

    it('DELETEs /diary/:id', function(done){
      let lunch = { name: 'lunch' }
      let options = {
        body: lunch,
        json: true,
        url: '/diary/1'
      }
      this.request.delete(options, (error, response, body) => {
        if (error) { done(error) }

        assert.equal(body.name, undefined)
        done()
      })
    })
  })

  describe('diary', () => {
    beforeEach(function(done){
      Diary.create('breakfast')
        .then(() => {
          done()
        });
    });

    afterEach( function(done){
      Diary.destroyAll()
        .then( function() { done() })
    })

    it('UPDATES /diary/:id', function(done) {
      let name = { name: 'lunch' }
      let options = {
        body: name,
        json: true,
        url: '/diary/1'
      }
      this.request.put(options, (error, response, body) => {
        if (error) { done(error) }

        assert.equal(body.name, "lunch")
        done()
      })
    })
  })
})

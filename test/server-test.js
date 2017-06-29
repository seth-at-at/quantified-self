const assert  = require('chai').assert
const app     = require('../server')
const request = require('request')

describe('Server', () => {
  before( (done) => {
    this.port = 9001

    this.server = app.listen(this.port, (error, result) => {
      if (error) { return done(error) }
      done()
    })

    this.request = request.defaults({
      baseUrl: 'http://localhost:9001/'
    })
  })

  after( () => {
    this.server.close()
  })

  it('Should exist', (done) => {
    assert(app)
    done()
  })

  describe('GET /', () => {
    it('shoulld return a 200', (done) => {
      this.request.get('/', (error, response) => {
        if (error) { done(error) }
        assert.notEqual(response.statusCode, 404)
        assert.equal(response.statusCode, 200)
        done()
      })
    })
  })
})

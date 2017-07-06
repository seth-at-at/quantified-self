const assert    = require('chai').assert
const Diary     = require('../lib/models/diary')
const Food      = require('../lib/models/food')
const DiaryFood = require('../lib/models/diary_foods')
const pry       = require('pryjs')


describe('diaryFoods model test', function() {

  beforeEach(done => {
    Diary.create('testing').then((data) => {
      console.log(Diary.last());
      Food.create('testing', 93).then((data) => {
        DiaryFood.create(data.rows, data.rows)
          .then(() => done())
      })
    })
  })

  afterEach(done => {
    DiaryFood.empty().then(() => {
      Food.destroyAll().then(() => {
        Diary.destroyAll().then(() => done())
      })
    })
  })

  it('Has a Diary and Food', function(done) {
    // console.log(DiaryFood.find(1))
    DiaryFood.find(1).then( data => {
      console.log(data.rows)
      assert.equal(data.rows[0].id, 1)
      assert.equal(data.rows[0].food_id, 1)
      assert.equal(data.rows[0].diary_id, 1)
      done()
    })
  })
})

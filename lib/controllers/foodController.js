const Food  = require('../models/food')
const Diary = require('../models/diary')
const DiaryFood = require('../models/diary_foods')

function index(request, response) {
  Food.all()
  .then(function(data) {
    if (data.rowCount === 0) { return response.status(404).send({ error: "No foods available!"}) }

    response.json(data.rows)
  })
}

function show(request, response) {
  let id = request.params.id
  Food.find(id)
    .then( (data) => {
      if (data.rowCount === 0) { return response.status(404).send({ error: "No name property provided!"}) }

      response.json(data.rows[0])
  })
}

function create(request, response) {
  let name = request.body.name
  let calories = request.body.calories
    if(!name || !calories) {
        return response.status(422).send({ error: 'Missing properties, try again.'})
      }
  Food.create(name, calories)
  .then( () => {
    Food.last()
    .then( (food) => {
      response.json(food.rows[0])
  })
})
}

function update(request, response) {
  const id = request.params.id
  const name = request.body.name
  const calories = request.body.calories
  Food.update(name, calories, id)
  .then( (data) => {
    if (data.rowCount === 0) { return response.sendStatus(404) }

    response.json(data.rows[0])
  })
}

function deleteFood(request, response) {
  const id = request.params.id
  Food.inactivateById(id)
  .then( (data) => {
    if (data.rowCount === 0) { return response.sendStatus(404) }

    Food.all()
    .then(foods => {
      response.json(foods.rows)
    })
  })
}

module.exports = {
  index: index,
  show: show,
  create: create,
  update: update,
  deleteFood: deleteFood
}

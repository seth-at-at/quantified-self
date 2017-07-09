const Food  = require('../models/food')
const Diary = require('../models/diary')
const DiaryFood = require('../models/diary_foods')

function index(request, response) {
  Diary.all()
    .then( (data) => {
      if (data.rowCount === 0) { return response.sendStatus(404) }

      response.json(data.rows)
    })
}

function show(request, response) {
  let id = request.params.id
  Diary.findFoodsFor(id)
    .then( (data) => {
      if (data.rowCount === 0) { return response.sendStatus(404) }

      response.json(data.rows)
    })
}

function create(request, response) {
  let name = request.body.name
  if (!name) {
    return response.status(422).send({ error: "No name property provided!"})
  }
  else {
    response.status(201).json({name})
  }
}

function update(request, response) {
  let diaryId = request.params.id
  let diaryName = request.body.name

  Diary.updateName(diaryName, diaryId)
    .then( (data) => {
      if (data.rowCount === 0) { return response.sendStatus(404) }

      response.json(data.rows[0])
  })
}

function deleteDiary(request, response) {
  let diaryId = request.params.id

  Diary.delete(diaryId)
    .then( (data) => {
      if (data.rowCount === 0) { return response.sendStatus(200)}

      Diary.all().then( (data) => {
        response.json(data.rows)
      })
    })
}

module.exports = {
  index: index,
  show: show,
  create: create,
  update: update,
  deleteDiary: deleteDiary
}

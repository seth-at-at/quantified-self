const express    = require('express')
const app        = express()
const bodyParser = require('body-parser') //> ability to parse the body of an HTTP request
const Diary      = require('./lib/models/diary')
const Food       = require('./lib/models/food')
const DiaryFood  = require('./lib/models/diary_foods')

app.set('port', process.env.PORT || 3000)
app.locals.title = 'QS'
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/',(request, response) => {
  response.send('It\'s a Calorie Counter!')
})

app.get('/api/v1/diary', (request, response) => {
  Diary.all()
    .then( (data) => {
      if (data.rowCount === 0) { return response.sendStatus(404) }

      response.json(data.rows)
    })
})

app.get('/api/v1/diary/:id', (request, response) => {
  let id = request.params.id
  Diary.findFoodsFor(id)
    .then( (data) => {
      if (data.rowCount === 0) { return response.sendStatus(404) }

      response.json(data.rows)
    })
})

app.post('/api/v1/diary', (request, response) => {
  let name = request.body.name
  if (!name) {
    return response.status(422).send({ error: "No name property provided!"})
  } else {
    response.status(201).json({name})
  }
})

app.get('/api/v1/foods/:id', (request, response) => {
  let id = request.params.id
  Food.find(id)
  .then( (data) => {
    if (data.rowCount === 0) { return response.status(422).send({ error: "No name property provided!"}) }

    response.json(data.rows[0])
  })
})

app.get('/api/v1/foods', (request, response) => {
  Food.all()
  .then( (data) => {
    if (data.rowCount === 0) { return response.status(422).send({ error: "No foods in the table!"}) }

    response.json(data.rows)
  })
})

app.post('/api/v1/foods', (request, response) => {
  let diaryName = request.body.diary_name
  let diaryData
  // console.log();
  Diary.findByName(diaryName)
  .then((data) => {
    diaryData = data

  })
  .then(() => {
    Food.create(request.body.name, request.body.calories)
  .then(function(data) {
    Food.last()
  .then((food) => {
    DiaryFood.create(diaryData.rows[0].id, food.rows[0].id)
  .then( (data) => {
      response.json(food.rows[0])
  })
  })
  })
  })
})

app.put('/api/v1/foods/:id', (request, response) => {
  const id = request.params.id
  const name = request.body.name
  const calories = request.body.calories
  Food.update(name, calories, id)
  .then( (data) => {
    if (data.rowCount === 0) { return response.sendStatus(404) }

    response.json(data.rows[0])
  })
})

app.delete('/api/v1/foods/:id', (request, response) => {
  const id = request.params.id
  Food.deleteFood(id)
  .then( (data) => {
    if (data.rowCount === 0) { return response.sendStatus(404) }

    Food.all()
    .then(foods => {
      response.json(foods.rows)
    })
  })
})


app.delete('/api/v1/diary/:id', (request, response) => {
  let diaryId = request.params.id;

  Diary.delete(diaryId)
    .then( (data) => {
      if (data.rowCount === 0) { return response.sendStatus(200)}

      Diary.all().then( (data) => {
        response.json(data.rows)
      })
    })
});

app.put('/api/v1/diary/:id', (request, response) => {
  let diaryId = request.params.id
  let diaryName = request.body.name

  Diary.updateName(diaryName, diaryId)
    .then( (data) => {
    if (data.rowCount === 0) { return response.sendStatus(404) }

    response.json(data.rows[0])
  })
})


if(!module.parent){
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`)
  })
}

module.exports = app

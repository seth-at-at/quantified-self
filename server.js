const express    = require('express')
const app        = express()
const bodyParser = require('body-parser') //> ability to parse the body of an HTTP request
const Diary       = require('./lib/models/diary')

app.set('port', process.env.PORT || 3000)
app.locals.title = 'QS'
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/',(request, response) => {
  response.send('It\'s a Calorie Counter!')
})

app.get('/api/v1/diary/:id', (request, response) => {
  let id = request.params.id
  Diary.find(id)
    .then( (data) => {
      if (data.rowCount === 0) { return response.sendStatus(404) }

      response.json(data.rows[0])
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


app.delete('/api/v1/diary/:id', (request, response) => {
  let diaryId = request.params.id;
  // const foodName = request.body.name;
  // console.log(request.params)
  Diary.delete(diaryId)
    .then( (data) => {
      if (data.rowCount === 0) { return response.sendStatus(200)}

      response.json(data.rows[0])
    })
    // .then(diary => {
    //   diary = diary.rows[0];
    //   // Food.findByName(foodName)
    //   //   .then(food => {
    //   //     food = food.rows[0];
    //   //     foodDiary.delete(diary.id, food.id)
    //   //       .then(() => {
    //   //         Meal.findFoodsFor(diaryName)
    //   //           .then(foods => {
    //   //             response.json(foods.rows);
    //   //           });
    //   //       });
    //   //   });
    // });
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

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

if(!module.parent){
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`)
  })
}

module.exports = app

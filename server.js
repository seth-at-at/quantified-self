const express    = require('express')
const app        = express()
const bodyParser = require('body-parser') //> ability to parse the body of an HTTP request
const User       = require('./lib/models/user')

app.set('port', process.env.PORT || 3000)
app.locals.title = 'QS'

app.get('/',(request, response) => {
  response.send('It\'s a Calorie Counter!')
})

app.get('/api/v1/users/:id', (request, response) => {
  let id = request.params.id
  User.find(id)
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

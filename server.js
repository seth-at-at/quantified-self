const express    = require('express')
const app        = express()
const bodyParser = require('body-parser') //> ability to parse the body of an HTTP request

app.set('port', process.env.PORT || 3000)
app.locals.title = 'QS'

app.get('/', function(request, response){
  response.send('It\'s a Calorie Counter!')
})

if(!module.parent){
  app.listen(app.get('port'), function() {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`)
  })
}

module.exports = app

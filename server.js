const express    = require('express')
const app        = express()
const bodyParser = require('body-parser') //> ability to parse the body of an HTTP request
const Diary      = require('./lib/models/diary')
const Food       = require('./lib/models/food')
const FoodRouter = require('./lib/routers/foodRouter')
const DiaryRouter = require('./lib/routers/diaryRouter')
const cors = require('cors');

app.use(cors({origin: '*'}))
app.set('port', process.env.PORT || 3000)
app.locals.title = 'QS'
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/v1/foods', FoodRouter)
app.use('/api/v1/diary', DiaryRouter)

app.get('/',(request, response) => {
  response.send('It\'s a Calorie Counter!')
})

if(!module.parent){
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`)
  })
}

module.exports = app

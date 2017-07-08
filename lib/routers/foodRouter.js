var FoodRouter = require('express').Router()
var FoodController = require('../controllers/foodController')

FoodRouter.get('/', function(request, response) {
  FoodController.index(request, response)
})

module.exports = FoodRouter

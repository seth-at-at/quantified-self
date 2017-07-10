const FoodRouter = require('express').Router()
const FoodController = require('../controllers/foodController')

FoodRouter.get('/', function(request, response) {
  FoodController.index(request, response)
})

FoodRouter.get('/:id', function(request, response) {
  FoodController.show(request, response)
})

FoodRouter.post('/', function(request, response) {
  FoodController.create(request, response)
})

FoodRouter.put('/:id', function(request, response) {
  FoodController.update(request, response)
})

FoodRouter.delete('/:id', function(request, response) {
  FoodController.deleteFood(request, response)
})

module.exports = FoodRouter

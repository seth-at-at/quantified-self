const DiaryRouter = require('express').Router()
const DiaryController = require('../controllers/diaryController')

DiaryRouter.get('/', function(request, response) {
  DiaryController.index(request, response)
})

DiaryRouter.get('/:id', function(request, response) {
  DiaryController.show(request, response)
})


DiaryRouter.post('/', function(request, response) {
  DiaryController.create(request, response)
})

DiaryRouter.put('/:id', function(request, response) {
  DiaryController.update(request, response)
})

DiaryRouter.delete('/:id', function(request, response) {
  DiaryController.deleteDiary(request, response)
})

module.exports = DiaryRouter

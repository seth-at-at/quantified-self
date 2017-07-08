var Food = require('../models/food')

function index(request, response) {
  Food.all()
  .then(function(data) {
    if (data.rowCount === 0) { return response.status(404).send({ error: "No foods available!"}) }

    response.json(data.rows)
  })
}

module.exports = {
  index: index
}

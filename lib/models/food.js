const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

function createFood(name, calories) {
  return database.raw(
    'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
    [name, calories, new Date]
  )
}

function emptyFoodsTable() {
  return database.raw(
    'TRUNCATE foods RESTART IDENTITY CASCADE'
  )
}

function find(id) {
  return database.raw(
    'SELECT * FROM foods WHERE id = ?', [id]
  )
}

function findFirst() {
  return database.raw('SELECT * FROM foods LIMIT 1')
}

function findName(name) {
  return database.raw(
    'SELECT * FROM foods WHERE name = ?', [name]
  )
}

function all() {
  return database.raw(
    'SELECT * FROM foods'
  )
}

function last() {
  return database.raw(
    'SELECT * FROM foods ORDER BY ID DESC LIMIT 1'
  )
}

function update(name, calories, id) {
  if (name && calories && id) {
    return database.raw(
      'UPDATE foods SET name = ?, calories = ? WHERE id = ? RETURNING name, calories', [name, calories, id]
    )
  }
  if (name && id) {
    return database.raw(
      'UPDATE foods SET name = ? WHERE id = ? RETURNING name', [name, id]
    )
  }
  if (calories && id) {
    return database.raw(
      'UPDATE foods SET calories = ? WHERE id = ? RETURNING calories', [calories, id]
    )
  }
}

function deleteFood(id) {
  return database.raw(
    'DELETE from foods WHERE id = ?', [id]
  )
}

module.exports = {
  create: createFood,
  find: find,
  first: findFirst,
  findName: findName,
  destroyAll: emptyFoodsTable,
  all: all,
  last: last,
  update: update,
  deleteFood: deleteFood
}

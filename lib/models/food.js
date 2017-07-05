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
    'TRUNCATE foods RESTART IDENTITY'
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

module.exports = {
  create: createFood,
  find: find,
  first: findFirst,
  findName: findName,
  destroyAll: emptyFoodsTable,
  all: all,
  last: last
}

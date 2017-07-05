const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);


function createDiary(name){
  return database.raw(
    'INSERT INTO diary (name, created_at) VALUES (?, ?)',
    [name, new Date]
  )
}

function findFirst() {
  return database.raw('SELECT * FROM diary LIMIT 1')
}

function emptyDiarysTable() {
  return database.raw('TRUNCATE diary RESTART IDENTITY')
}

function find(id){
  return database.raw('SELECT * FROM diary WHERE id=?', [id])
}

function findName(name){
  return database.raw('SELECT * FROM diary WHERE name=?', [name])
}

module.exports = {
  create: createDiary,
  first: findFirst,
  find: find,
  findName: findName,
  destroyAll: emptyDiarysTable
}

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);


function createUser(name){
  return database.raw(
    'INSERT INTO users (name, created_at) VALUES (?, ?)',
    [name, new Date]
  )
}

function findFirst() {
  return database.raw('SELECT * FROM users LIMIT 1')
}

function emptyUsersTable() {
  return database.raw('TRUNCATE users RESTART IDENTITY')
}

function find(id){
  return database.raw('SELECT * FROM users WHERE id=?', [id])
}

module.exports = {
  create: createUser,
  first: findFirst,
  find: find,
  destroyAll: emptyUsersTable
}

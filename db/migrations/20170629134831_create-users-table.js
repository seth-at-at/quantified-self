
exports.up = function(knex, Promise) {
  let createQueary = `CREATE TABLE users(id SERIAL PRIMARY KEY NOT NULL,
                                         name TEXT,
                                         created_at TIMESTAMP)`
  return knex.raw(createQueary)
};

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE users`
  return knex.raw(dropQuery)
};

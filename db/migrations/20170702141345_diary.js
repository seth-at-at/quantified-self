
exports.up = function(knex, Promise) {
  let createQueary = `CREATE TABLE diary(id SERIAL PRIMARY KEY NOT NULL,
                                         name TEXT,
                                         created_at TIMESTAMP)`
  return knex.raw(createQueary)
};

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE diary`
  return knex.raw(dropQuery)
};

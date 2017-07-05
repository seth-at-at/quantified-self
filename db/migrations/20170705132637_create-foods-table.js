
exports.up = function(knex, Promise) {
  let queryCreate = `CREATE TABLE foods(
    id SERIAL PRIMARY KEY NOT NULL,
    name TEXT,
    calories INTEGER
    created_at TIMESTAMP
  )`;
  return knex.raw(createQuery);
};

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE foods`;
  return knex.raw(dropQuery);
};

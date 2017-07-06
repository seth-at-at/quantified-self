
exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE diary_foods(
    id SERIAL PRIMARY KEY NOT NULL,
    diary_id integer REFERENCES diary,
    food_id integer REFERENCES foods,
    created_at TIMESTAMP
  )`;
  return knex.raw(createQuery);
};

exports.down = function(knex, Promise) {
  let dropQuery = 'DROP TABLE diary_foods'
  return knex.raw(dropQuery);
};

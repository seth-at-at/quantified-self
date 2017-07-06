exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE foods RESTART IDENTITY CASCADE')
    .then(function () {
      return Promise.all([
        knex.raw(
          'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
          ['apple', 50, new Date]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
          ['orange', 45, new Date]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
          ['pear', 30, new Date]
        )
      ])
    });
};

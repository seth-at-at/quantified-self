exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE diary_foods RESTART IDENTITY')
    .then(function () {
      return Promise.all([
        knex.raw(
          'INSERT INTO diary_foods (diary_id, food_id, created_at) VALUES (?, ?, ?)',
          [1, 1, new Date]
        ),
        knex.raw(
          'INSERT INTO diary_foods (diary_id, food_id, created_at) VALUES (?, ?, ?)',
          [1, 2, new Date]
        ),
        knex.raw(
          'INSERT INTO diary_foods (diary_id, food_id, created_at) VALUES (?, ?, ?)',
          [1, 3, new Date]
        ),
        knex.raw(
          'INSERT INTO diary_foods (diary_id, food_id, created_at) VALUES (?, ?, ?)',
          [2, 2, new Date]
        ),
        knex.raw(
          'INSERT INTO diary_foods (diary_id, food_id, created_at) VALUES (?, ?, ?)',
          [3, 3, new Date]
        )
      ])
    });
};

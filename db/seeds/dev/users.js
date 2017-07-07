exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE diary RESTART IDENTITY CASCADE')
  .then(function() {
    return Promise.all([
      knex.raw(
        'INSERT INTO diary (name, created_at) VALUES (?, ?)',
        ["Breakfast", new Date()]
      ),
      knex.raw(
        'INSERT INTO diary (name, created_at) VALUES (?, ?)',
        ["Lunch", new Date()]
      ),
      knex.raw(
        'INSERT INTO diary (name, created_at) VALUES (?, ?)',
        ["Dinner", new Date()]
      ),
      knex.raw(
        'INSERT INTO diary (name, created_at) VALUES (?, ?)',
        ["Snacks", new Date()]
      ),
      knex.raw(
        'INSERT INTO diary (name, created_at) VALUES (?, ?)',
        ["Brunch", new Date()]
      ),
      knex.raw(
        'INSERT INTO diary (name, created_at) VALUES (?, ?)',
        ["Second Breakfast", new Date()]
      )
    ]);
  });
};

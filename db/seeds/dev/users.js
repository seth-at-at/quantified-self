exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE diary RESTART IDENTITY')
  .then(function() {
    return Promise.all([
      knex.raw(
        'INSERT INTO diary (name, created_at) VALUES (?, ?)',
        ["Seth", new Date]
      ),
      knex.raw(
        'INSERT INTO diary (name, created_at) VALUES (?, ?)',
        ["Brett", new Date]
      ),
      knex.raw(
        'INSERT INTO diary (name, created_at) VALUES (?, ?)',
        ["Charles", new Date]
      )
    ]);
  });
};

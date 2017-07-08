exports.up = function(knex, Promise) {
  return knex.schema.table('foods', function(t){
    t.enu('status', ['active', 'inactive']).defaultTo('active');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('foods', function(t){
    t.dropColumn('status')
  })
};

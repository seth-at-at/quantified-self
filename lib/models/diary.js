const env    = process.env.NODE_ENV || 'development';
const config = require('../../knexfile')[env];
const db     = require('knex')(config);

const createDiary = name => {
  return db.raw(
    'INSERT INTO diary (name, created_at) VALUES (?, ?)', [name, new Date]
  );
};

const emptyDiarysTable = () => {
  return db.raw(
    'TRUNCATE diary RESTART IDENTITY CASCADE'
  );
};

const find = id => {
  return db.raw(
    'SELECT * FROM diary WHERE id = ?', [id]
  );
};

const findByName = name => {
  return db.raw(
    'SELECT * FROM diary WHERE name = ?', [name]
  );
};

const all = () => {
  return db.raw(
    'SELECT * FROM diary'
  );
};

const findFoodsFor = name => {
  return db.raw(
    `SELECT foods.* FROM foods
    JOIN diary_foods ON foods.id = diary_foods.food_id
    JOIN diary ON diary.id = diary_foods.meal_id
    WHERE diary.name = ?`, [name]
  )
};

const deleteSelected = id => {
  return db.raw(`DELETE * FROM diary WHERE id = ?`, [id])
}

const updateName = newName => {
  // return db.raw(`UPDATE * FROM diary WHERE id = ?`, [id]) WIP
}

module.exports = {
  create: createDiary,
  destroyAll: emptyDiarysTable,
  find: find,
  delete: deleteSelected,
  updateName: updateName,
  // findFoodsFor: findFoodsFor,
  all: all,
  findByName: findByName
};

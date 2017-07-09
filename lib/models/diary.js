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
  )
};

const all = () => {
  return db.raw(
    'SELECT * FROM diary'
  );
};

const findFoodsFor = id => {
  return db.raw(
    `SELECT foods.* FROM foods
    JOIN diary_foods ON foods.id = diary_foods.food_id
    JOIN diary ON diary.id = diary_foods.diary_id
    WHERE diary.id = ?`, [id]
  )
};

const deleteSelected = id => {
  return db.raw(`DELETE FROM diary WHERE id = ?`, [id])
}

const updateName = (newName, id) => {
  return db.raw(`UPDATE diary SET name = ? WHERE id = ? RETURNING name`, [newName, id])
}

const last = () => {
  return db.raw(`SELECT * FROM diary ORDER BY ID DESC LIMIT 1`)
}

const first = () => {
  return db.raw('SELECT * FROM diary LIMIT 1')
}

module.exports = {
  create: createDiary,
  destroyAll: emptyDiarysTable,
  find: find,
  delete: deleteSelected,
  updateName: updateName,
  last: last,
  findFoodsFor: findFoodsFor,
  all: all,
  findByName: findByName,
  first: first
};

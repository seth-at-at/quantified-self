const env    = process.env.NODE_ENV || 'development';
const config = require('../../knexfile')[env];
const db     = require('knex')(config);

const createDiaryFoods = (diaryId, foodId) => {
  return db.raw(
    'INSERT INTO diary_foods (diaryId, foodId, createdAt) VALUES (?, ?, ?)', [diaryId, foodId, new Date]
  )
}

const emptyDiaryFoods = () => {
  return db.raw(
    'TRUNCATE diary_foods RESTART IDENTITY CASCADE'
  )
}

const find = (id) => {
  return db.raw(
    'SELECT * FROM diary_foods WHERE id = ?', [id]
  )
}

const del = (id) => {
  return db.raw(
    'DELETE from diary_foods WHERE id = ?', [id]
  )
}

module.exports = {
  create: createDiaryFoods,
  empty: emptyDiaryFoods,
  find: find,
  delete: del
}

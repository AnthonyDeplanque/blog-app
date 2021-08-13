const connection = require ('../db-config');
const db = connection.promise();

const addCategoryQuery = (title) =>{
  return db.query('INSERT INTO categories SET ?', [title]);
}
const getCategoriesQuery = () => {
  return db.query('SELECT * FROM categories');
}
const getOneCategoryQueryById = (id) => {
  return db.query('SELECT * FROM categories WHERE id = ?', [id]);
}
const getOneCategoryQueryByTitle = (title) =>{
  return db.query('SELECT * FROM categories WHERE title = ?', [title]);
}
const getSelectedCategoriesQuery = (first, last)=>{
  return db.query ('SELECT * FROM categories LIMIT ?, ?', [first, last]);
}

const updateCategoryQuery =(id, values) =>{
  return db.query ('UPDATE categories SET ? WHERE id = ?', [values, id]);
}
const deleteCategoryQuery = (id)=> {
  return db.query ('DELETE FROM categories WHERE id = ? ', [id]);
}

module.exports = {
  addCategoryQuery,
  getCategoriesQuery, 
  getOneCategoryQueryById, 
  getOneCategoryQueryByTitle, 
  getSelectedCategoriesQuery,
  updateCategoryQuery, 
  deleteCategoryQuery
}
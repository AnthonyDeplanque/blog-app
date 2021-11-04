const connection = require("../db-config");
const db = connection.promise();

const addNewsQuery = (title) => {
  return db.query("INSERT INTO news SET ?", [title]);
};
const getNewsQuery = () => {
  return db.query("SELECT * FROM news ORDER BY date DESC ");
};
const getOneNewsQueryById = (id) => {
  return db.query("SELECT * FROM news WHERE id = ?", [id]);
};
const getOneNewsQueryByTitle = (title) => {
  return db.query("SELECT * FROM news WHERE title = ?", [title]);
};
const getSelectedNewsQuery = (first, last) => {
  return db.query("SELECT * FROM news ORDER BY date DESC LIMIT ?, ?", [
    first,
    last,
  ]);
};
const updateNewsQuery = (id, values) => {
  return db.query("UPDATE news SET ? WHERE id = ?", [values, id]);
};
const deleteNewsQuery = (id) => {
  return db.query("DELETE FROM news WHERE id = ? ", [id]);
};

module.exports = {
  addNewsQuery,
  getNewsQuery,
  getOneNewsQueryById,
  getOneNewsQueryByTitle,
  getSelectedNewsQuery,
  updateNewsQuery,
  deleteNewsQuery,
};

const connection = require("../db-config");
const db = connection.promise();

const addImageQuery = (values) => {
  return db.query("INSERT INTO images SET ?", [values]);
};
const getImagesQuery = () => {
  return db.query("SELECT * FROM images");
};
const getOneImageQueryById = (id) => {
  return db.query("SELECT * FROM images WHERE id = ?", [id]);
};
const getSelectedImagesQuery = (first, last) => {
  return db.query("SELECT * FROM images LIMIT ? , ?", [first, last]);
};
const updateImageQuery = (id, values) => {
  return db.query("UPDATE images SET ? WHERE id = ?", [values, id]);
};
const deleteImageQuery = (id) => {
  return db.query("DELETE FROM images WHERE id = ?", id);
};

module.exports = {
  addImageQuery,
  getImagesQuery,
  getOneImageQueryById,
  getSelectedImagesQuery,
  updateImageQuery,
  deleteImageQuery,
};

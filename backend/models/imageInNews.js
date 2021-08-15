const connection = require("../db-config");
const db = connection.promise();

const addImageInNewsQuery = (values) => {
  return db.query("INSERT INTO imageInNews SET ?", [values]);
};
const getImageInNewsQuery = () => {
  return db.query("SELECT * FROM imageInNews");
};
const getImageInNewsByImageIdQuery = (idImage) => {
  return db.query("SELECT * FROM imageInNews WHERE idImage = ?", [idImage]);
};
const getImageInNewsByNewsIdQuery = (idNews) => {
  return db.query("SELECT * FROM imageInNews WHERE idNews = ?", [idNews]);
};
const getImageInNewsByIdQuery = (id) => {
  return db.query("SELECT * FROM imageInNews WHERE id = ?", [id]);
};
const updateImageInNewsQuery = (id, values) => {
  return db.query("UPDATE imageInNews SET ? WHERE id = ? "[(values, id)]);
};
const deleteImageInNewsQuery = (id) => {
  return db.query("DELETE FROM imageInNews WHERE id = ? ", [id]);
};

module.exports = {
  addImageInNewsQuery,
  getImageInNewsByIdQuery,
  getImageInNewsByImageIdQuery,
  getImageInNewsByNewsIdQuery,
  getImageInNewsQuery,
  updateImageInNewsQuery,
  deleteImageInNewsQuery,
};

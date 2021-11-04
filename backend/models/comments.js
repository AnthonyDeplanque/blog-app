const connection = require("../db-config");
const db = connection.promise();

const addCommentQuery = (values) => {
  return db.query("INSERT INTO comments SET ?", [values]);
};
const updateCommentQuery = (id, values) => {
  return db.query("UPDATE comments SET ? WHERE id = ?", [values, id]);
};
const deleteCommentQuery = (id) => {
  return db.query("DELETE FROM comments WHERE id = ? ", [id]);
};
const getCommentsQuery = () => {
  return db.query("SELECT * FROM comments");
};
const getCommentsByIdQuery = (id) => {
  return db.query("SELECT * FROM comments WHERE id = ?", [id]);
};
const getCommentsByIdUserQuery = (idUser) => {
  return db.query("SELECT * FROM comments WHERE idUser = ?", [idUser]);
};
const getCommentsByIdNewsQuery = (idNews) => {
  return db.query("SELECT * FROM comments WHERE idNews = ?", [idNews]);
};

module.exports = {
  addCommentQuery,
  updateCommentQuery,
  deleteCommentQuery,
  getCommentsQuery,
  getCommentsByIdNewsQuery,
  getCommentsByIdUserQuery,
  getCommentsByIdQuery,
};

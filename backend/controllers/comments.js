const Joi = require("joi");
const commentsMiddleware = require("../middlewares/comments");
const commentsModel = require("../models/comments");

const postComment = (req, res) => {
  const { idNews, idUser, date, content } = req.body;
  const { error } = Joi.object(
    commentsMiddleware.postCommentValidationObject
  ).validate({ idNews, idUser, date, content }, { abortEarly: false });
  if (error) {
    console.error(error);
    res.status(500).json({ validationError: error.details });
  } else {
    commentsModel
      .addCommentQuery({ idNews, idUser, date, content })
      .then(([results]) => {
        const id = results.insertId;
        const createdComment = { id, idNews, idUser, date, content };
        res.status(201).json({
          ...results,
          message: "REQUEST_OK",
          detail: "comment created",
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          ...error,
          message: "SERVER_ERROR",
          detail: "error creating a news",
        });
      });
  }
};
const getAllComments = (req, res) => {
  const { idUser, idNews } = req.query;
  if (idUser && idNews) {
    res.status(500).json({
      message: "SERVER_ERROR",
      detail: "You have to choose bewteen idNews and idUser",
    });
  } else if (idUser) {
    commentsModel
      .getCommentsByIdUserQuery(+idUser)
      .then(([results]) => {
        if (results.length) {
          res.status(200).json(results);
        } else {
          res.status(404).json({
            message: "NOT_FOUND",
            detail: `idUser ${idUser} not found`,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "SERVER_ERROR", detail: error });
      });
  } else if (idNews) {
    commentsModel
      .getCommentsByIdNewsidNewsQuery(+idNews)
      .then(([results]) => {
        if (results.length) {
          res.status(200).json(results);
        } else {
          res.status(404).json({
            message: "NOT_FOUND",
            detail: `idNews ${idNews} not found`,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "SERVER_ERROR", detail: error });
      });
  } else {
    commentsModel
      .getCommentsQuery()
      .then(([results]) => {
        res.status(200).json(results);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "SERVER_ERROR", detail: error });
      });
  }
};
const getOneComment = (req, res) => {
  const { id } = req.params;
  commentsModel
    .getCommentsByIdQuery(id)
    .then(([[results]]) => {
      if (results) {
        res.status(200).json(results);
      } else {
        res.status(404).json({
          message: "NOT_FOUND",
          detail: `comment with id ${id} not found`,
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "SERVER_ERROR", detail: error });
    });
};
const updateComment = (req, res) => {
  const { id } = req.params;
  const validationError = Joi.object(
    commentsMiddleware.updateCommentValidationObject
  ).validate(req.body, { abortEarly: false }).error;
  commentsModel.getCommentsByIdQuery(id).then(([results]) => {
    if (!results) {
      res.status(404).json({
        message: "NOT_FOUND",
        detail: `comment with id ${id} not found`,
      });
    } else {
      if (validationError){
        console.error(validationError.details[0].error);
        res.status(403).json(validationError);
      } else {
        commentsModel.updateCommentQuery(id, req.body).then(([results])=>{
          res.status(200).json({
            ...results,
            message:"REQUEST_OK",
            detail : `comment with id ${id} successfully updated`
          })
        })
        .catch(error=>{
          console.error(error);
          res.status(500).json({
            message: "SERVER_ERROR",
            detail: {
              error: error,
              message: `error updating comment ${id}`,
            },
          });
        })
      }
    }
  });
};
const deleteComment = (req, res) => {
  const { id } = req.params;
  commentsModel.deleteCommentQuery(id).then(([results])=>{
    if (results.affectedRows){
      res.status(201).json({
        message:"REQUEST_OK",
        detail :`comment ${id} successfully deleted`
      });
    } else {
      res.status(404).json({
        message:"NOT_FOUND",
        detail:`comment ${id} not found`
      })
    }
  })
  .catch(error=>{
    console.error(error);
    res.status(500).json({message:'SERVER_ERROR', detail:error})
  })
};

module.exports = {
  postComment,
  getAllComments,
  getOneComment,
  updateComment,
  deleteComment,
};

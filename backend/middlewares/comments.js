const Joi = require("joi");

const postCommentValidationObject = {
  idNews: Joi.number().required(),
  idUser: Joi.number().required(),
  date: Joi.number().required(),
  content: Joi.string().required(),
};

const updateCommentValidationObject = {
  idNews: Joi.number(),
  idUser: Joi.number(),
  date: Joi.number(),
  content: Joi.string(),
};
module.exports = { postCommentValidationObject, updateCommentValidationObject };

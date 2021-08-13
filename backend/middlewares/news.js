const Joi = require("joi");

const postNewsValidationObject = {
  title: Joi.string().max(255).required(),
  idCategory: Joi.number().required(),
  idUser: Joi.number().required(),
  date: Joi.number().required(),
  content: Joi.string().required(),
};

const updateNewsValidationObject = {
  title: Joi.string().max(255),
  idCategory: Joi.number(),
  idUser: Joi.number(),
  date: Joi.number(),
  content: Joi.string(),
};
module.exports={postNewsValidationObject, updateNewsValidationObject};
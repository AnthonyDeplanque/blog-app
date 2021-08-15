const Joi = require("joi");

const postImageInNewsValidationObject = {
  idNews: Joi.number().required(),
  idImage: Joi.number().required(),
};

const updateImageInNewsValidationObject = {
  idNews: Joi.number(),
  idImage: Joi.number(),
};
module.exports = { postImageInNewsValidationObject, updateImageInNewsValidationObject };

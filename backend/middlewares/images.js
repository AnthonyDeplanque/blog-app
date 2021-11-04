const Joi = require("joi");

const postImageValidationObject = {
  name: Joi.string().max(255).required(),
  description: Joi.string().max(255).required(),
  link: Joi.string().allow(null, ""),
};
const updateImageValidationObject = {
  name: Joi.string().max(255),
  description: Joi.string().max(255),
  link: Joi.string().allow(null, ""),
};

module.exports = { postImageValidationObject, updateImageValidationObject };

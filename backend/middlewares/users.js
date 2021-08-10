const Joi = require("joi");

const postUserValidationObject = {
  nickName: Joi.string().max(80).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).max(100).required(),
  hashedPassword: Joi.string().max(150).required(),
  role: Joi.number().required(),
  firstName: Joi.string().max(64).required(),
  lastName: Joi.string().max(64).required(),
  date: Joi.number().required(),
  bio: Joi.string().required(),
  image: Joi.string().required(),
};

const updateUserValidationObject = {
  nickName: Joi.string().max(80),
  email: Joi.string().email({ minDomainSegments: 2 }).max(100),
  hashedPassword: Joi.string().max(150),
  role: Joi.number(),
  firstName: Joi.string().max(64),
  lastName: Joi.string().max(64),
  date: Joi.number(),
  bio: Joi.string(),
  image: Joi.string(),
};
module.exports = {postUserValidationObject, updateUserValidationObject};
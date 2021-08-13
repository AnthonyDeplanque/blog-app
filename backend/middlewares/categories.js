const Joi = require ('joi');

const postCategoryValidationObject = {
  title : Joi.string().max(255).required(),
};
const updateCategoryValidationObject = {
  title : Joi.string().max(255)
}
module.exports ={postCategoryValidationObject, updateCategoryValidationObject};

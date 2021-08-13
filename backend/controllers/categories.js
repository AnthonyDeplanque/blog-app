const Joi = require("joi");
const categoriesModel = require("../models/categories");
const categoriesMiddleware = require("../middlewares/categories");

const postCategory = (req, res) => {
  const { title } = req.body;
  const { error } = Joi.object(
    categoriesMiddleware.postCategoryValidationObject
  ).validate({ title }, { abortEarly: false });
  if (error) {
    console.error(error);
    res.status(422).json({ validationError: error.details });
  } else {
    categoriesModel
      .getOneCategoryQueryByTitle(title)
      .then(([results]) => {
        if (results.length) {
          res.status(409).json({ message: "ALREADY_EXIST" });
        } else {
          categoriesModel
            .addCategoryQuery({ title })
            .then(([results]) => {
              const id = results.insertId;
              const createdCategory = {
                id,
                title,
              };
              res.status(201).json({
                ...createdCategory,
                message: "REQUEST_OK",
                detail: "Category successfully created",
              });
            })
            .catch((error) => {
              console.error(error);
              res.status(500).json({
                message: "SERVER_ERROR",
                detail: "error creating a category",
              });
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          message: "SERVER_ERROR",
          detail: "error retrieving a category",
        });
      });
  }
};
const getAllCategories = (req, res) => {
  const { first, last, title } = req.query;
  if (title) {
    categoriesModel
      .getOneCategoryQueryByTitle(title)
      .then(([[results]]) => {
        res.status(200).json(results);
      })
      .catch((error) => {
        console.error(error);
        res.status(204).json({
          message: "NOT_FOUND",
          detail: `category ${title} not found`,
        });
      });
  }
  if (first && last) {
    categoriesModel
      .getSelectedCategoriesQuery(+first, +last)
      .then(([results]) => {
        res.status(200).json(...results);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "SERVER_ERROR", detail: error });
      });
  } else {
    categoriesModel
      .getCategoriesQuery()
      .then(([results]) => res.status(200).json(results))
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "SERVER_ERROR", detail: error });
      });
  }
};
const getOneCategoryById = (req, res) => {
  const { id } = req.params;
  categoriesModel
    .getOneCategoryQueryById(id)
    .then(([[results]]) => {
      if (results) {
        res.status(200).json(results);
      } else {
        res.status(404).json({
          message: "NOT_FOUND",
          detail: `Category with id ${id} not found`,
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "SERVER_ERROR", detail: error });
    });
};

const updateCategory = (req, res) => {
  const { id } = req.params;
  const validationErrors = Joi.object(
    categoriesMiddleware.updateCategoryValidationObject
  ).validate(req.body, { abortEarly: false }).error;
  categoriesModel.getOneCategoryQueryById(id).then(([[results]]) => {
    if (!results) {
      res.status(404).json({
        message: "NOT_FOUND",
        detail: `category with id ${id} not found`,
      });
    } else {
      if (validationErrors) {
        console.error(validationErrors.details[0].message);
        res.status(403).json(validationErrors);
      } else {
        categoriesModel
          .updateCategoryQuery(id, req.body)
          .then(([results]) => {
            res.status(200).json({
              ...results,
              message: "REQUEST_OK",
              detail: `category with id ${id} successfully updated`,
            });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({
              message: "SERVER_ERROR",

              detail: {
                error: error,
                message: `error updating category ${id}`,
              },
            });
          });
      }
    }
  });
};

const deleteCategory = (req, res) => {
  const { id } = req.params;
  categoriesModel
    .deleteCategoryQuery(id)
    .then(([results]) => {
      if (results.affectedRows) {
        res.status(200).json({
          message: "REQUEST_OK",
          detail: `category ${id} deleted`,
        });
      } else {
        res.status(404).json({
          message: "NOT_FOUND",
          detail: `category ${id} not found`,
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: "SERVER_ERROR",
        detail: error,
      });
    });
};

module.exports = {
  postCategory,
  getAllCategories,
  getOneCategoryById,
  updateCategory,
  deleteCategory,
}
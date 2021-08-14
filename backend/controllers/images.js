const Joi = require("joi");
const imagesModel = require("../models/images");
const imagesMiddleware = require("../middlewares/images");

const postImage = (req, res) => {
  const { name, description, link } = req.body;
  const { error } = Joi.object(
    imagesMiddleware.postImageValidationObject
  ).validate({ name, description, link }, { abortEarly: false });
  if (error) {
    console.error(error);
    res.status(422).json({ validationError: error.details });
  } else {
    imagesModel
      .addImageQuery({ name, description, link })
      .then(([results]) => {
        const id = results.insertId;
        const createdImage = { id, name, description, link };
        res.status(201).json({
          ...createdImage,
          message: "REQUEST_OK",
          detail: "image successfully created",
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          ...error,
          message: "SERVER_ERROR",
          detail: "error creating an image",
        });
      });
  }
};

const getAllImages = (req, res) => {
  const { first, last } = req.query;
  if (first && last) {
    imagesModel
      .getSelectedImagesQuery(+first, +last)
      .then(([results]) => {
        res.status(200).json(results);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "SERVER_ERROR", detail: error });
      });
  } else {
    imagesModel
      .getImagesQuery()
      .then(([results]) => {
        res.status(200).json(results);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "SERVER_ERROR", detail: error });
      });
  }
};

const getOneImageById = (req, res) => {
  const { id } = req.params;
  imagesModel
    .getOneImageQueryById(id)
    .then(([[results]]) => {
      if (results) {
        res.status(200).json(results);
      } else {
        res.status(404).json({
          message: "NOT_FOUND",
          detail: `image with id ${id} not found`,
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "SERVER_ERROR", detail: error });
    });
};

const updateImage = (req, res) => {
  const { id } = req.params;
  const validationError = Joi.object(
    imagesMiddleware.updateImageValidationObject
  ).validate(req.body, { abortEarly: false }).error;
  imagesModel.getOneImageQueryById(id).then(([[results]]) => {
    if (!results) {
      res
        .status(404)
        .json({
          message: "NOT_FOUND",
          detail: `image with id ${id} not found`,
        });
    } else {
      if (validationError) {
        console.error(validationError.detail[0].validate);
        res.status(403).json(validationError);
      } else {
        imagesModel
          .updateImageQuery(id, req.body)
          .then(([results]) => {
            res.status(200).json({
              ...results,
              message: "REQUEST_OK",
              detail: `image with id ${id} successfully updated`,
            });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({
              message: "SERVER_ERROR",
              detail: {
                error: error,
                message: `error updating image ${id}`,
              },
            });
          });
      }
    }
  });
};
const deleteImage = (req, res) => {
  const { id } = req.params;
  imagesModel
    .deleteImageQuery(id)
    .then(([results]) => {
      if (results.affectedRows) {
        res
          .status(200)
          .json({
            message: "REQUEST_OK",
            detail: `image with id ${id} deleted`,
          });
      } else {
        res
          .status(404)
          .json({
            message: "NOT_FOUND",
            detail: `image with id ${id} not found`,
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "SERVER_ERROR", detail: error });
    });
};

module.exports = {
  postImage,
  getAllImages,
  getOneImageById,
  updateImage,
  deleteImage,
};

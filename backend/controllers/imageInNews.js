const Joi = require("joi");
const imageInNewsModel = require("../models/imageInNews");
const imageInNewsMiddleware = require("../middlewares/imageInNews");

const postImageInNews = (req, res) => {
  const { idNews, idImage } = req.body;
  const { error } = Joi.object(
    imageInNewsMiddleware.postImageInNewsValidationObject
  ).validate({ idNews, idImage }, { abortEarly: false });
  if (error) {
    console.error(error);
    res.status(422).json({ validationError: error.details });
  } else {
    imageInNewsModel
      .addImageInNewsQuery({ idNews, idImage })
      .then(([results]) => {
        const id = results.insertId;
        const createdImageInNews = { id, idNews, idImage };
        res.status(201).json({
          ...createdImageInNews,
          message: "REQUEST_OK",
          detail: "link between image and news successfully created",
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          ...error,
          message: "SERVER_ERROR",
          detail: "error creating a link between image and news",
        });
      });
  }
};

const getAllImageInNews = (req, res) => {
  const { idNews, idImage } = req.query;
  if (idNews && idImage) {
    res.status(500).json({
      message: "SERVER_ERROR",
      detail: "You have to choose bewteen idNews and idImage",
    });
  }
  if (idNews) {
    imageInNewsModel
      .getImageInNewsByNewsIdQuery(+idNews)
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
  }
  if (idImage) {
    imageInNewsModel
      .getImageInNewsByImageIdQuery(+idImage)
      .then(([results]) => {
        if (results.length) {
          res.status(200).json(results);
        } else {
          res.status(404).json({
            message: "NOT_FOUND",
            detail: `idImage ${idImage} not found`,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "SERVER_ERROR", detail: error });
      });
  } else {
    imageInNewsModel
      .getImageInNewsQuery()
      .then(([results]) => {
        res.status(200).json(results);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "SERVER_ERROR", detail: error });
      });
  }
};
const getOneImageInNewsById = (req, res) => {
  const { id } = req.params;
  imageInNewsModel
    .getImageInNewsByIdQuery(id)
    .then(([[results]]) => {
      if (results) {
        res.status(200).json(results);
      } else {
        res.status(404).json({
          message: "NOT_FOUND",
          detail: `link between image and news with id ${id} not found`,
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "SERVER_ERROR", detail: error });
    });
};
const updateImageInNews = (req, res) => {
  const { id } = req.params;
  const validationError = Joi.object(
    imageInNewsMiddleware.updateImageInNewsValidationObject
  ).validate(req.body, { abortEarly: false }).error;
  imageInNewsModel.getImageInNewsByIdQuery(id).then(([[results]]) => {
    if (!results) {
      res.status(404).json({
        message: "NOT_FOUND",
        detail: `link between image and news with id ${id} not found`,
      });
    } else {
      if (validationError) {
        console.error(validationError.details[0].validate);
        res.status(403).json(validationError);
      } else {
        imageInNewsModel
          .updateImageInNewsQuery(id, req.body)
          .then(([results]) => {
            res.status(200).json({
              ...results,
              message: "REQUEST_OK",
              detail: `link between image and news with id ${id} successfully updated`,
            });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({
              message: "SERVER_ERROR",
              detail: {
                error: error,
                message: `error updating a link between image and news with id ${id}`,
              },
            });
          });
      }
    }
  });
};

const deleteImageInNews = (req, res) => {
  const { id } = req.params;
  imageInNewsModel
    .deleteImageInNewsQuery(id)
    .then(([results]) => {
      if (results.affectedRows) {
        res
          .status(201)
          .json({
            message: "REQUEST_OK",
            detail: `link between image and news with id ${id} successfully deleted`,
          });
      } else {
        res
          .status(404)
          .json({
            message: "NOT_FOUND",
            detail: `link between image and news with id ${id} not found`,
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "SERVER_ERROR", detail: error });
    });
};

module.exports = {
  postImageInNews,
  getAllImageInNews,
  getOneImageInNewsById,
  updateImageInNews,
  deleteImageInNews,
};

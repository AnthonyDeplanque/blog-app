const Joi = require("joi");
const newsModel = require("../models/news");
const newsMiddleware = require("../middlewares/news");

const postNews = (req, res) => {
  const { title, idCategory, idUser, date, content } = req.body;
  const { error } = Joi.object(
    newsMiddleware.postNewsValidationObject
  ).validate(
    { title, idCategory, idUser, date, content },
    { abortEarly: false }
  );
  if (error) {
    console.error(error);
    res.status(422).json({ validationError: error.details });
  } else {
    newsModel
      .addNewsQuery({ title,idCategory, idUser, date, content })
      .then(([results]) => {
        const id  = results.insertId;
        const createdNews = { id, title, idCategory, idUser, date, content };
        res.status(201).json({
          ...createdNews,
          message: "REQUEST_OK",
          detail: "News successfully created",
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
const getAllNews = (req, res) => {
  const { first, last } = req.query;
  if (first && last) {
    newsModel
      .getSelectedNewsQuery(+first, +last)
      .then(([results]) => {
        res.status(200).json(results);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "SERVER_ERROR", detail: error });
      });
  } else {
    newsModel
      .getNewsQuery()
      .then(([results]) => {
        res.status(200).json(results);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "SERVER_ERROR", detail: error });
      });
  }
};

const getOneNewsById = (req, res) => {
  const { id } = req.params;
  newsModel
    .getOneNewsQueryById(id)
    .then(([[results]]) => {
      if (results) {
        res.status(200).json(results);
      } else {
        res.status(404).json({
          message: "NOT_FOUND",
          detail: `News with id ${id} not found`,
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "SERVER_ERROR", detail: error });
    });
};

const updateNews = (req, res) => {
  const { id } = req.params;
  const validationError = Joi.object(
    newsMiddleware.updateNewsValidationObject
  ).validate(req.body, { abortEarly: false }).error;
  newsModel.getOneNewsQueryById(id).then(([[results]]) => {
    if (!results) {
      res.status(404).json({
        message: "NOT_FOUND",
        detail: `news with id ${id} not found`,
      });
    } else {
      if (validationError) {
        console.error(validationError.details[0].message);
        res.status(403).json(validationError);
      } else {
        newsModel
          .updateNewsQuery(id, req.body)
          .then(([results]) => {
            res.status(200).json({
              ...results,
              message: "REQUEST_OK",
              detail: `news with id ${id} successfully updated`,
            });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({
              message: "SERVER_ERROR",
              detail: {
                error: error,
                message: `error updating news ${id}`,
              },
            });
          });
      }
    }
  });
};
const deleteNews = (req, res) => {
  const { id } = req.params;
  newsModel
    .deleteNewsQuery(id)
    .then(([results]) => {
      if (results.affectedRows) {
        res.status(200).json({
          message: "REQUEST_OK",
          detail: `news ${id} deleted`,
        });
      } else {
        res.status(404).json({
          message: "NOT_FOUND",
          detail: `news ${id} not found`,
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

module.exports = {postNews, getAllNews, getOneNewsById, updateNews, deleteNews};

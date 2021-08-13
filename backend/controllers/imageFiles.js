const multer = require("multer");
const usersModel = require('../models/users')

const {storageForNews, storageForUsers} = require("../services/multer");
const uploadNews = multer({ storageForNews }).single("file");
const uploadAvatar = multer({ storageForUsers }).single("file");

const uploadImageForNews = (req, res) => {
  uploadNews(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.error(err);
      res.status(500).json(err);
    } else if (err) {
      console.error(err);
      res.status(500).json(err);
    } else {
      const { path } = req.file;
      // SQL QUERY updateNewsQuery(id, { image: path });
      res.status(200).send(req.file);
    }
  });
};
const uploadImageForUser = (req, res) => {
  uploadAvatar(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.error(err);
      res.status(500).json(err);
    } else if (err) {
      console.error(err);
      res.status(500).json(err);
    } else {
      const {id} = req.params;
      const { path } = req.file;
      usersModel.updateUserQuery(id, { image: path });
      res.status(200).send(req.file);
    }
  });
};

module.exports = { uploadImageForNews, uploadImageForUser };

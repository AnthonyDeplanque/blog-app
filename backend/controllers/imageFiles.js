const multer = require("multer");

const storage = require("../services/multer");
const upload = multer({ storage }).single("file");

const uploadImage = (req, res) => {
  upload(req, res, (err) => {
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

module.exports = { uploadImage };

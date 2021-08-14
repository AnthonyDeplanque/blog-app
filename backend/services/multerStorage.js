const multer = require("multer");
const path = require('path');

const storageImage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "file-storage/public/images");
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname+"-"+Date.now()+path.extname(file.originalname)}`);
  },
});

const storageAvatar = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "file-storage/public/avatar");
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname+"-"+Date.now()+path.extname(file.originalname)}`);
  },
});

module.exports = {storageImage, storageAvatar};
const multer = require("multer");

const storageForNews = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "file-storage/public/images");
  },
  filename(req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const storageForUsers = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "file-storage/public/avatar");
  },
  filename(req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

module.exports = {storageForNews, storageForUsers};
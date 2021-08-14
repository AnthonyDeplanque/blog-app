const express = require("express");
const {
  uploadImageForNews,
  uploadAvatarForUser,
} = require("../controllers/imageFiles");

const router = express.Router();
router.post("/image/", uploadImageForNews);
router.post("/avatar/", uploadAvatarForUser);

module.exports = router;

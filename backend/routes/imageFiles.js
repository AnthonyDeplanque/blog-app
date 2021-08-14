const express = require("express");
const { uploadImageForUser } = require("../controllers/imageFiles");

const router = express.Router();
router.post("/uploadAvatar/:id", uploadImageForUser);

module.exports = router;

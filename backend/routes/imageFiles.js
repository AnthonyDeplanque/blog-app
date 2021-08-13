const express = require("express");
const { uploadImage } = require("../controllers/imageFiles");

const router = express.Router();
router.post("/uploadImage", uploadImage);

module.exports = router;

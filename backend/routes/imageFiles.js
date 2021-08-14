const express = require("express");
const {
  uploadImageForNews,
  uploadAvatarForUser,
} = require("../controllers/imageFiles");

const router = express.Router();
router.post("/image/", uploadImageForNews);
router.post("/avatar/", uploadAvatarForUser);
router.get("/", (req, res) => {
  res.status(200).json({ message: "Try to test on a POST route" });
});

module.exports = router;

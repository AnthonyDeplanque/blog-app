const express = require('express');
const {postImage, updateImage, getAllImages, getOneImageById, deleteImage} = require('../controllers/images');

const router = express.Router();

router.get('/',getAllImages);
router.get('/:id', getOneImageById);
router.post('/', postImage);
router.put('/:id', updateImage);
router.delete('/:id', deleteImage);

module.exports = router;
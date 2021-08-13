const express = require('express');
const {getAllNews, getOneNewsById, updateNews, postNews, deleteNews} = require('../controllers/news');

const router = express.Router();

router.get('/', getAllNews);
router.get('/:id', getOneNewsById);
router.post('/', postNews);
router.put('/:id',updateNews);
router.delete('/:id', deleteNews);

module.exports = router;
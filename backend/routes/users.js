const express = require("express");
const {postUser, loginUser} = require('../controllers/users');

const router = express.Router();

router.post('/', postUser);
router.post('/auth/', loginUser);

module.exports = router;
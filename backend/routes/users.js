const express = require("express");
const {postUser} = require('../controllers/users');

const router = express.Router();

router.post('/', postUser);

module.exports = router;
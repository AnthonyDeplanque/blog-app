const express = require("express");
const {postUser, loginUser, getAllUsers, getOneUserById} = require('../controllers/users');

const router = express.Router();

router.post('/', postUser);
router.post('/auth/', loginUser);
router.get("/", getAllUsers);
router.get('/:id', getOneUserById);

module.exports = router;
const express = require("express");
const {postUser, loginUser, getAllUsers, getOneUserById, deleteUser} = require('../controllers/users');

const router = express.Router();

router.post('/', postUser);
router.post('/auth/', loginUser);
router.get("/", getAllUsers);
router.get('/:id', getOneUserById);
router.delete('/:id', deleteUser);

module.exports = router;
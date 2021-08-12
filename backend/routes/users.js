const express = require("express");
const {postUser, loginUser, getAllUsers, getOneUserById, deleteUser, updateUser, updateUserPassword} = require('../controllers/users');

const router = express.Router();

router.post('/', postUser);
router.post('/auth/', loginUser);
router.get("/", getAllUsers);
router.get('/:id', getOneUserById);
router.delete('/:id', deleteUser);
router.put("/:id", updateUser);
router.put("/pwd/:id", updateUserPassword);

module.exports = router;
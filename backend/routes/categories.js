const express = require("express");
const {
  postCategory,
  getAllCategories,
  getOneCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");

const router = express.Router();

router.post('/', postCategory);
router.get('/', getAllCategories);
router.get('/:id', getOneCategoryById);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
const express = require('express');
const router = express.Router();
const ingredientController = require('../controllers/ingredients');

router.get('/', ingredientController.getIngredients);

router.post('/', ingredientController.postIngredients);

router.put('/:id', ingredientController.putIngredients);

module.exports = router;
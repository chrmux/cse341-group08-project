const express = require('express');
const router = express.Router();
const ingredientController = require('../controllers/ingredients');

router.get('/', ingredientController.getIngredients);


module.exports = router;
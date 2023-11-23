const express = require('express');
const router = express.Router({ mergeParams: true });
const recipesController = require('../controllers/recipes');

router.get('/', recipesController.getRecipes);

router.get('/:_id', recipesController.getRecipeById);


module.exports = router;
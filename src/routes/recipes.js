const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipes');

router.get('/', recipesController.getRecipes);

router.post('/', recipesController.postRecipes);

router.put('/:id', recipesController.putRecipes);


module.exports = router;
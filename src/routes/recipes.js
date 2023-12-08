const express = require("express");
const router = express.Router({ mergeParams: true });
const recipesController = require("../controllers/recipes");

router.get("/", recipesController.getRecipes);

// Route to delete a recipe by ID
router.delete("/:id", recipesController.deleteRecipe);
router.get("/:_id", recipesController.getRecipeById);

router.post('/', recipesController.postRecipes);

router.put('/:id', recipesController.putRecipes);

module.exports = router;

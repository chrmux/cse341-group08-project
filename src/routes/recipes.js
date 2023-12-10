const express = require("express");
const router = express.Router({ mergeParams: true });
const recipesController = require("../controllers/recipes");
const valid = require("../middleware/validation-middleware");

router.get("/", recipesController.getRecipes);

// Route to delete a recipe by ID
router.delete("/:id", valid.have_id, recipesController.deleteRecipe);
router.get("/:_id", valid.have_id, recipesController.getRecipeById);

router.post('/', valid.saveRecipe, recipesController.postRecipes);

router.put('/:id', valid.saveRecipe, recipesController.putRecipes);

module.exports = router;

const express = require("express");
const router = express.Router();
const recipesController = require("../controllers/recipes");

router.get("/", recipesController.getRecipes);

// Route to delete a recipe by ID
router.delete("/:id", recipesController.deleteRecipe);

module.exports = router;

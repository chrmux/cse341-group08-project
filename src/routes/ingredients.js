const express = require("express");
const router = express.Router();
const ingredientController = require("../controllers/ingredients");

router.get("/", ingredientController.getIngredients);

router.delete("/:id", ingredientController.deleteIngredient);

module.exports = router;

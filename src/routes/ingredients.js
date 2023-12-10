const express = require("express");
const router = express.Router();
const ingredientController = require("../controllers/ingredients");
const validator = require("../helper/validate");
const valid = require('../middleware/validation-middleware');

router.get("/", ingredientController.getIngredients);
router.delete("/:id", valid.have_id, ingredientController.deleteIngredient);
router.get("/:_id", valid.have_id, ingredientController.getIngredientById);

router.post('/', valid.saveIngredients, ingredientController.postIngredients);

router.put('/:id', valid.saveIngredients, ingredientController.putIngredients);

module.exports = router;

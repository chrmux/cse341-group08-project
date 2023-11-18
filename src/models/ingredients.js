const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
    name: {
    type: String,
  },
  description: {
    type: String,

  },
  category: {
    type: String
  },
}, { timestamps: true });

const Ingredient = mongoose.model("ingredients", ingredientSchema);

module.exports = Ingredient;
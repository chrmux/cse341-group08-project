const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
// const { ObjectId } = require("mongodb");

// Get all recipes
const getRecipes = async (req, res, next) => {
  console.log("In get Recipes");
  try {
    const result = await mongodb
      .getDb()
      .db("Group08-Project03")
      .collection(
        "Recipes"
      ) /* if r in "recipes" is uppercase get result will return empty*/
      .find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (e) {
    console.log(e);
    res.status(400).json("Error in Get Recipes");
  }
};

// Delete a recipe
const deleteRecipe = async (req, res) => {
  const recipeId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db("Group08-Project03")
    .collection("Recipes")
    .deleteOne({ _id: recipeId });
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while deleting the recipe.");
  }
};

module.exports = {
  getRecipes,
  deleteRecipe,
};

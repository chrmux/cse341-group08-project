const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

// Get all ingredients
const getIngredients = async (req, res, next) => {
  console.log("In get ingredients");
  try {
    const result = await mongodb
      .getDb()
      .db("Group08-Project03")
      .collection(
        "Ingredients"
      ) /* if i in "ingredients" is uppercase get result will return empty*/
      .find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (e) {
    console.log(e);
    res.status(400).json("Error in Get Ingredients");
  }
};

// delete ingredient by id
const deleteIngredient = async (req, res) => {
  const ingredientId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db("Group08-Project03")
    .collection("Ingredients")
    .deleteOne({ _id: ingredientId });
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while deleting the ingredient."
      );
  }
};

module.exports = {
  getIngredients,
  deleteIngredient,
};

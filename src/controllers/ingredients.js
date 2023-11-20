const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

// Get all ingredients
const getIngredients = async (req, res, next) => {
  console.log("In get ingredients");
  try {
    const result = await mongodb
      .getDb()
      .db("Group08-Project03")
      .collection("ingredients") /* if i in "ingredients" is uppercase get result will return empty*/ 
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

module.exports = {
  getIngredients,
};

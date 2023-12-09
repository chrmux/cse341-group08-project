const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

// Get all ingredients
const getIngredients = async (req, res, next) => {
  console.log("In get ingredients");
  try {
    const query = {};
    if (req.query.name) {
      query.name = req.query.name;
    }

    const result = await mongodb
      .getDb()
      .db("Group08-Project03")
      .collection(
        "Ingredients"
      )
      .find(query);
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

const getIngredientById = async (req, res, next) => {
  console.log("In get Ingredient by ID");
  // console.log(req.params);
  // console.log(req.params._id);
  try {
    if (!req.params["_id"]) {
      console.error("Lack of _id error in get ingredient by id");
    }
    let query = { _id: new ObjectId(req.params["_id"]) };

    const result = await mongodb
      .getDb()
      .db("Group08-Project03")
      .collection("Ingredients")
      .find(query);
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (e) {
    console.error(e);
    res.status(400).json("Error in Get Ingredient by ID");
  }
};

const postIngredients = async(req, res) => {
    const postData = req.body
    try {
        const result = await mongodb.getDb().db('Group08-Project03').collection('Ingredients').insertOne(postData);
        res.setHeader('Content-Type', 'application/json').status(201).json(result);
    } catch (e) {
        console.log(e);
        res.status(400).json("Ingredients Post Request: Invalid request data found in request body.");
    }
}

const putIngredients = async(req, res) => {
    const newData = req.body;
    const id = req.params.id;
    try {
        const result = await mongodb.getDb().db('Group08-Project03').collection('Ingredients').findOneAndUpdate(
            {_id: new ObjectId(id)},
            { $set: newData },
            {returnOriginal: false}
        );
        if(result == null){
            res.status(404).json({ error: `Ingredients Put Request: No item found with id of ${id}` })
            return
        }
        res.setHeader('Content-Type', 'application/json').status(200).json(result);
    } catch (e) {
        console.log(e);
        res.status(400).json("Ingredients Put Request: Invalid request data found in request body.");
    }
}

module.exports = {
  getIngredients,
  deleteIngredient,
  getIngredientById,
  postIngredients,
  putIngredients
};
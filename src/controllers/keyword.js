const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getKeywords = async (req, res, next) => {
  console.log("In get keywords");
  try {
    const result = await mongodb
      .getDb()
      .db("Group08-Project03")
      .collection("Keywords")
      .find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (e) {
    console.log(e);
    res.status(400).json("Error in Get Keywords");
  }
};

module.exports = {
  getKeywords,
};

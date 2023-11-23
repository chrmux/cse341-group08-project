const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getKeywords = async (req, res, next) => {
  console.log("In get keywords");
  try {
    const result = await mongodb
      .getDb()
      .db("Group08-Project03")
      .collection(
        "Keywords"
      ) /* if k in "keywords" is uppercase get result will return empty*/
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

// delete Keyword by id
const deleteKeyword = async (req, res) => {
  const keywordId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db("Group08-Project03")
    .collection("Keywords")
    .deleteOne({ _id: keywordId });
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while deleting the keyword."
      );
  }
};

module.exports = {
  getKeywords,
  deleteKeyword,
};

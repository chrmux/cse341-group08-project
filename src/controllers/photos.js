const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

//get all photos
const getPhotos = async (req, res, next) => {
  console.log("In get photos");
  try {
    const query = {};
    if (req.body.title) {
      query.title = req.body.title;
    }

    const result = await mongodb
      .getDb()
      .db("Group08-Project03")
      .collection("Photos")
      .find(query);
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json("Error in get photos");
  }
};

//get photo by id
const getPhotoById = async (req, res, next) => {
  console.log("In get photo by id");
  try {
    if (!req.params["_id"]) {
      console.error("Lack of _id error in get photo by id");
    }
    let query = { _id: new ObjectId(req.params["_id"]) };

    const result = await mongodb
      .getDb()
      .db("Group08-Project03")
      .collection("Photos")
      .find(query);
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (err) {
    console.error(e);
    res.status(400).json("Error in get photo by id");
  }
};

const postPhotos = async (req, res) => {
  const postData = req.body;
  try {
    const result = await mongodb
      .getDb()
      .db("Group08-Project03")
      .collection("Photos")
      .insertOne(postData);
    res.setHeader("Content-Type", "application/json").status(201).json(result);
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .json("Photos Post Request: Invalid request data found in request body.");
  }
};

const putPhotos = async (req, res) => {
  const newData = req.body;
  const id = req.params.id;
  try {
    const result = await mongodb
      .getDb()
      .db("Group08-Project03")
      .collection("Photos")
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: newData },
        { returnOriginal: false }
      );
    if (result == null) {
      res
        .status(404)
        .json({ error: `Photos Put Request: No item found with id of ${id}` });
      return;
    }
    res.setHeader("Content-Type", "application/json").status(200).json(result);
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .json("Photos Put Request: Invalid request data found in request body.");
  }
};

// delete Keyword by id
const deletePhoto = async (req, res) => {
  const photoId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db("Group08-Project03")
    .collection("Photos")
    .deleteOne({ _id: photoId });
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send(response);
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while deleting the photo.");
  }
};

module.exports = {
  getPhotos,
  getPhotoById,
  postPhotos,
  putPhotos,
  deletePhoto,
};

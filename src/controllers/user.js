const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getUsers = async (req, res, next) => {
  console.log("In get users");
  try {
    const query = {};
    if (req.body.email) {
      query.email = req.body.email;
    }
    if (req.body.password) {
      query.password = req.body.password;
    }
    console.log(query);

    const result = await mongodb
      .getDb()
      .db("Group08-Project03")
      .collection(
        "Users"
      )
      .find(query);
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (e) {
    console.log(e);
    res.status(400).json("Error in Get Users");
  }
};

const getUserByID = async (req, res, next) => {
  console.log("In get User by ID");
  // console.log(req.params);
  // console.log(req.params._id);
  try {
    if (!req.params["_id"]) {
      console.error("Lack of _id error in get keyword by id");
    }
    let query = { _id: new ObjectId(req.params["_id"]) };
    console.log(query);
    const result = await mongodb
      .getDb()
      .db("Group08-Project03")
      .collection("Users")
      .find(query);
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (e) {
    console.error(e);
    res.status(400).json("Error in Get User by ID");
  }
};

const getUserByEmail = async (req, res, next) => {
  console.log("In get User by email");
  // console.log(req.params);
  // console.log(req.params._id);
  try {
    if (!req.body["email"]) {
      console.error("Lack of email error in get user by email");
    }
    let query = { email: req.body["email"] };
    console.log(query);

    const result = await mongodb
      .getDb()
      .db("Group08-Project03")
      .collection("Users")
      .find(query);
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (e) {
    console.error(e);
    res.status(400).json("Error in Get User by email");
  }
};

const getUserByPassword = async (req, res, next) => {
  console.log("In get User by password");
  // console.log(req.params);
  // console.log(req.params._id);
  try {
    if (!req.body["password"]) {
      console.error("Lack of password error in get user by password");
    }
    let query = { password: req.body["password"] };

    const result = await mongodb
      .getDb()
      .db("Group08-Project03")
      .collection("Users")
      .find(query);
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (e) {
    console.error(e);
    res.status(400).json("Error in Get User by password");
  }
};

// Delete user
const deleteUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db("Group08-Project03")
    .collection("Users")
    .deleteOne({ _id: userId });
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while deleting the user.");
  }
};

module.exports = {
  getUsers,
  getUserByID,
  getUserByEmail,
  getUserByPassword,
  deleteUser,
};

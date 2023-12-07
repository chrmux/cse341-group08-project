const express = require("express");
const router = express.Router();
const { signUp, login } = require("../../src/controllers/user");
const userController = require("../controllers/user");

//get all users for admin only
router.get("/", userController.getUsers);

//get user by email
router.get("/email", userController.getUserByEmail);

//get user by password
router.get("/password", userController.getUserByPassword);

//get user by id
router.get("/:_id", userController.getUserByID);

router.delete("/:id", userController.deleteUser);

router.put("/:id", userController.putUsers);

router.patch("/:id", userController.patchUsers);

// router.post('/signup', signUp);
// router.post('/login', login);

module.exports = router;

const express = require("express");
const router = express.Router();
const photoController = require("../controllers/photos");

router.get("/", photoController.getPhotos);

router.post("/", photoController.postPhotos);

router.put("/:id", photoController.putPhotos);

router.get("/:_id", photoController.getPhotoById);

router.delete("/:id", photoController.deletePhoto);

module.exports = router;

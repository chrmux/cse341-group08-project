const express = require("express");
const router = express.Router();
const photoController = require("../controllers/photos");

router.get("/", photoController.getPhotos);

router.post('/', photosController.postPhotos);

router.put('/:id', photosController.putPhotos);

router.get("/:_id", photoController.getPhotoById);

module.exports = router;
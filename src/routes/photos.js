const express = require("express");
const router = express.Router();
const photoController = require("../controllers/photos");
const valid = require('../middleware/validation-middleware');

router.get("/", photoController.getPhotos);

router.post("/", valid.savePhotos, photoController.postPhotos);

router.put("/:id", valid.saveIngredients, photoController.putPhotos);

router.get("/:_id", valid.have_id, photoController.getPhotoById);

router.delete("/:id", valid.have_id, photoController.deletePhoto);

module.exports = router;

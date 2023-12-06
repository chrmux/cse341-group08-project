const express = require('express');
const router = express.Router();
const photosController = require('../controllers/photos');

router.get('/', photosController.getPhotos);

router.post('/', photosController.postPhotos);

router.put('/:id', photosController.putPhotos);

module.exports = router;
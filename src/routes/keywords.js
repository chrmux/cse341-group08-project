const express = require('express');
const router = express.Router();
const keywordController = require('../controllers/keyword');

router.get('/', keywordController.getKeywords);

router.post('/', keywordController.postKeywords);

router.put('/:id', keywordController.putKeywords);


module.exports = router;
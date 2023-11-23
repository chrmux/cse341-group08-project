const express = require('express');
const router = express.Router();
const keywordController = require('../controllers/keyword');

router.get('/', keywordController.getKeywords);

router.get('/:_id', keywordController.getKeywordById);

module.exports = router;
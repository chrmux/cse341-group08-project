const express = require("express");
const router = express.Router();
const keywordController = require("../controllers/keyword");
const valid = require("../middleware/validation-middleware");

router.get("/", keywordController.getKeywords);

router.delete("/:id", valid.have_id, keywordController.deleteKeyword);
router.get("/:_id", valid.have_id, keywordController.getKeywordById);

router.post('/', valid.saveKeywords, keywordController.postKeywords);

router.put('/:id', valid.saveKeywords, keywordController.putKeywords);

module.exports = router;

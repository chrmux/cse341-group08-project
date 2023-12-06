const express = require("express");
const router = express.Router();
const keywordController = require("../controllers/keyword");

router.get("/", keywordController.getKeywords);

router.delete("/:id", keywordController.deleteKeyword);
router.get("/:_id", keywordController.getKeywordById);

router.post('/', keywordController.postKeywords);

router.put('/:id', keywordController.putKeywords);

module.exports = router;

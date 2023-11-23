const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getKeywords = async (req, res, next) => {
  console.log("In get keywords");
  try {
    const query = {};
    if(req.body.classification) {
        query.classification = req.body.classification;
    }
    console.log(query); 

    const result = await mongodb
      .getDb()
      .db("Group08-Project03")
      .collection("Keywords") /* if k in "keywords" is uppercase get result will return empty*/
      .find(query);
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (e) {
    console.log(e);
    res.status(400).json("Error in Get Keywords");
  }
};

const getKeywordById = async (req, res, next) => {
    console.log("In get keyword by ID");
    // console.log(req.params);
    // console.log(req.params._id);
    try {
        if(!req.params['_id']) {
            console.error("Lack of _id error in get keyword by id");
        };
        let query = {'_id': new ObjectId(req.params['_id'])};

        const result = await mongodb.getDb().db('Group08-Project03').collection('Keywords').find(query);
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    } catch (e) {
        console.error(e);
        res.status(400).json("Error in Get Keyword by ID");
    }
};

const getKeywordsByClassification = async (req, res, next) => {
    console.log("In get Keywords by classification");
    // console.log(req.params);
    // console.log(req.params._id);
    try {
        if(!req.params['classification']) {
            console.error("Lack of classification error in get keywords by classification");
        };
        let query = {'classification': req.params['classification']};

        const result = await mongodb.getDb().db('Group08-Project03').collection('Keywords').find(query);
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    } catch (e) {
        console.error(e);
        res.status(400).json("Error in Get keywords by classification");
    }
};

module.exports = {
  getKeywords,
  getKeywordById,
};

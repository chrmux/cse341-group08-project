const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getKeywords = async(req, res, next) => {
    console.log("In get keywords");
    try {
        const query = {};
        if (req.body.classification) {
            query.classification = req.body.classification;
        }
        console.log(query);

        const result = await mongodb
            .getDb()
            .db("Group08-Project03")
            .collection("Keywords")
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

// delete Keyword by id
const deleteKeyword = async(req, res) => {
    const keywordId = new ObjectId(req.params.id);
    const response = await mongodb
        .getDb()
        .db("Group08-Project03")
        .collection("Keywords")
        .deleteOne({ _id: keywordId });
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(200).send();
    } else {
        res
            .status(500)
            .json(
                response.error || "Some error occurred while deleting the keyword."
            );
    }
};

const getKeywordById = async(req, res, next) => {
    console.log("In get keyword by ID");
    // console.log(req.params);
    // console.log(req.params._id);
    try {
        if (!req.params["_id"]) {
            console.error("Lack of _id error in get keyword by id");
        }
        let query = { _id: new ObjectId(req.params["_id"]) };

        const result = await mongodb
            .getDb()
            .db("Group08-Project03")
            .collection("Keywords")
            .find(query);
        result.toArray().then((lists) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(lists);
        });
    } catch (e) {
        console.error(e);
        res.status(400).json("Error in Get Keyword by ID");
    }
};

const getKeywordsByClassification = async(req, res, next) => {
    console.log("In get Keywords by classification");
    // console.log(req.params);
    // console.log(req.params._id);
    try {
        if (!req.params["classification"]) {
            console.error(
                "Lack of classification error in get keywords by classification"
            );
        }
        let query = { classification: req.params["classification"] };

        const result = await mongodb
            .getDb()
            .db("Group08-Project03")
            .collection("Keywords")
            .find(query);
        result.toArray().then((lists) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(lists);
        });
    } catch (e) {
        console.error(e);
        res.status(400).json("Error in Get keywords by classification");
    }
};

const postKeywords = async(req, res) => {
    const postData = req.body;
    try {
        const result = await mongodb
            .getDb()
            .db("Group08-Project03")
            .collection("Keywords")
            .insertOne(postData);
        res.setHeader("Content-Type", "application/json").status(201).json(result);
    } catch (e) {
        console.log(e);
        res
            .status(400)
            .json(
                "Keywords Post Request: Invalid request data found in request body."
            );
    }
};

const putKeywords = async(req, res) => {
    const newData = req.body;
    const id = req.params.id;
    try {
        const result = await mongodb
            .getDb()
            .db("Group08-Project03")
            .collection("Keywords")
            .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: newData }, { returnOriginal: false });
        if (result == null) {
            res.status(404).json({
                error: `Keywords Put Request: No item found with id of ${id}`,
            });
            return;
        }
        res.setHeader("Content-Type", "application/json").status(200).json(result);
    } catch (e) {
        console.log(e);
        res
            .status(400)
            .json(
                "Keywords Put Request: Invalid request data found in request body."
            );
    }
};

module.exports = {
    getKeywords,
    deleteKeyword,
    getKeywordById,
    postKeywords,
    putKeywords,
};
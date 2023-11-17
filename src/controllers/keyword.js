const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getKeywords = async(req, res, next) => {
    console.log("In get keywords");
    try {
        const result = await mongodb.getDb().db('Group08-Project03').collection('Keywords').find({});
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    } catch (e) {
        console.log(e);
        res.status(400).json("Error in Get Keywords");
    }
}

const postKeywords = async(req, res) => {
    const postData = req.body
    try {
        const result = await mongodb.getDb().db('Group08-Project03').collection('Keywords').insertOne(postData);
        res.setHeader('Content-Type', 'application/json').status(201).json(result);
    } catch (e) {
        console.log(e);
        res.status(400).json("Keywords Post Request: Invalid request data found in request body.");
    }
}

const putKeywords = async(req, res) => {
    const newData = req.body;
    const id = req.params.id;
    try {
        const result = await mongodb.getDb().db('Group08-Project03').collection('Keywords').findOneAndUpdate(
            {_id: new ObjectId(id)},
            { $set: newData },
            {returnOriginal: false}
        );
        if(result == null){
            res.status(404).json({ error: `Keywords Put Request: No item found with id of ${id}` })
            return
        }
        res.setHeader('Content-Type', 'application/json').status(200).json(result);
    } catch (e) {
        console.log(e);
        res.status(400).json("Keywords Put Request: Invalid request data found in request body.");
    }
}

module.exports = {
    getKeywords,
    postKeywords,
    putKeywords
}
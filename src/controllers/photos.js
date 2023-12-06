const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getPhotos = async(req, res, next) => {
    console.log("In get photos");
    try {
        const result = await mongodb.getDb().db('Group08-Project03').collection('Photos').find({});
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    } catch (e) {
        console.log(e);
        res.status(400).json("Error in Get Photos");
    }
}

const postPhotos = async(req, res) => {
    const postData = req.body
    try {
        const result = await mongodb.getDb().db('Group08-Project03').collection('Photos').insertOne(postData);
        res.setHeader('Content-Type', 'application/json').status(201).json(result);
    } catch (e) {
        console.log(e);
        res.status(400).json("Photos Post Request: Invalid request data found in request body.");
    }
}

const putPhotos = async(req, res) => {
    const newData = req.body;
    const id = req.params.id;
    try {
        const result = await mongodb.getDb().db('Group08-Project03').collection('Photos').findOneAndUpdate(
            {_id: new ObjectId(id)},
            { $set: newData },
            {returnOriginal: false}
        );
        if(result == null){
            res.status(404).json({ error: `Photos Put Request: No item found with id of ${id}` })
            return
        }
        res.setHeader('Content-Type', 'application/json').status(200).json(result);
    } catch (e) {
        console.log(e);
        res.status(400).json("Photos Put Request: Invalid request data found in request body.");
    }
}

module.exports = {
    getPhotos,
    postPhotos,
    putPhotos
}
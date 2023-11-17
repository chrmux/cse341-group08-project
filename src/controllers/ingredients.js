const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getIngredients = async(req, res, next) => {
    console.log("In get Ingredients");
    try {
        const result = await mongodb.getDb().db('Group08-Project03').collection('Ingredients').find({});
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    } catch (e) {
        console.log(e);
        res.status(400).json("Error in Get Ingredients");
    }
}

const postIngredients = async(req, res) => {
    const postData = req.body
    try {
        const result = await mongodb.getDb().db('Group08-Project03').collection('Ingredients').insertOne(postData);
        res.setHeader('Content-Type', 'application/json').status(201).json(result);
    } catch (e) {
        console.log(e);
        res.status(400).json("Ingredients Post Request: Invalid request data found in request body.");
    }
}

const putIngredients = async(req, res) => {
    const newData = req.body;
    const id = req.params.id;
    try {
        const result = await mongodb.getDb().db('Group08-Project03').collection('Ingredients').findOneAndUpdate(
            {_id: new ObjectId(id)},
            { $set: newData },
            {returnOriginal: false}
        );
        if(result == null){
            res.status(404).json({ error: `Ingredients Put Request: No item found with id of ${id}` })
            return
        }
        res.setHeader('Content-Type', 'application/json').status(200).json(result);
    } catch (e) {
        console.log(e);
        res.status(400).json("Ingredients Put Request: Invalid request data found in request body.");
    }
}

module.exports = {
    getIngredients,
    postIngredients,
    putIngredients
}
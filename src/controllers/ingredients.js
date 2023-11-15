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

module.exports = {
    getIngredients
}
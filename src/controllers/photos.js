const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

//get all photos
const getPhotos = async(req, res, next) => {
    console.log("In get photos");
    try {
        const query = {};
        if(req.body.title) {
            query.title = req.body.title;
        };

        const result = await mongodb
            .getDb()
            .db("Group08-Project03")
            .collection("Photos")
            .find(query);
        result.toArray().then((lists) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(lists);
        });

    } catch (err) {
        console.log(err);
        res.status(400).json("Error in get photos");
    };
};

//get photo by id
const getPhotoById = async (req,res,next) => {
    console.log("In get photo by id");
    try {
        if(!req.params["_id"]) {
            console.error("Lack of _id error in get photo by id");
        };
        let query = {_id: new ObjectId(req.params["_id"])};

        const result = await mongodb
            .getDb()
            .db("Group08-Project03")
            .collection("Photos")
            .find(query);
        result.toArray().then((lists) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(lists);
        })
    } catch(err) {
        console.error(e);
        res.status(400).json("Error in get photo by id");
    };
};

module.exports = {
    getPhotos,
    getPhotoById
}
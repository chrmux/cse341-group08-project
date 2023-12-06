const validator = require("../helper/validate");

// Recipes

//post recipe
const saveRecipe = (req, res, next) => {
    const validationRule = {
        photo: "required|string",
        title: "required|string",
        ingredients: "required|array",
        instructions: "required|array",
        creator: "required|string",
        keywords: "required|array",
        culture: "required|string",
        level: "required|string",
        description: "required|string"
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if(!status) {
            res.status(412).send({
                success: false,
                message: "Validation failed in save recipe",
                data: err
            });
        } else {
            next();
        };
    });
};

// Keywords

//post keywords
const saveKeywords = (req, res, next) => {
    const validationRule = {
        classification: "required|string",
        name: "required|string"
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if(!status) {
            res.status(412).send({
                success: false,
                message: "validation failed in save keywords",
                data: err
            });
        } else {
            next();
        };
    });
};


// User?

// Ingredients

//post ingredients
const saveIngredients = (req, res, next) => {
    const validationRule = {
        name: "required|string",
        description: "required|string",
        category: "required|string"   
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if(!status) {
            res.status(412).send({
                success: false,
                message: "validation failed in save ingredients",
                data: err
            });
        } else {
            next();
        };
    });
};


//have id?
const have_id = (req, res, next) => {
    const validationRule = {
        _id: "required|string"
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if(!status) {
            res.status(412).send({
                success: false,
                message: "validation failed due to lack of _id",
                data: err
            });
        } else {
            next();
        };
    });
};

//have name?
const haveName = (req, res, next) => {
    const validationRule = {
        name: "required|string"
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if(!status) {
            res.status(412).send({
                success: false,
                message: "validation failed due to lack of name",
                data: err
            });
        } else {
            next();
        };
    });
};

//have classification?
const haveClassification = (req, res, next) => {
    const validationRule = {
        classification: "required|string"
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if(!status) {
            res.status(412).send({
                success: false,
                message: "validation failed due to lack of classification",
                data: err
            });
        } else {
            next();
        };
    });
};





module.exports = {
    saveRecipe,
    saveKeywords,
    saveIngredients,
    have_id,
    haveName,
    haveClassification
}
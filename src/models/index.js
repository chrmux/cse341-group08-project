const dbConfig = require('../db/db.config.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
//db.recipe = require('./RecipeModel.js')(mongoose);
//db.ingredient = require('./ingredients.js')(mongoose);
//db.user = require('./UserModel.js')(mongoose);

module.exports = db;
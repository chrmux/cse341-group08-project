const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let _db;

const initDb = (callback) => {
  if (_db) {
    console.err('Db is already initialized!');
  }
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  //console.log("in getDb");
  if (!_db) {
    console.log("no Db found");
  }
  //console.log("yes db");
  return _db;
};


module.exports = {
  initDb,
  getDb,
};
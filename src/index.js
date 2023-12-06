const http = require("http");
const expressApp = require("./app");
const mongodb = require('./db/connect');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 8080;

const server = http.createServer(expressApp);


mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    server.listen(port);
    console.log(`Connected to DB and listening on port ${port}`);
  }
});
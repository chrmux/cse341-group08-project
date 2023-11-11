const http = require("http");
const express = require('express');
const expressApp = require("./app");
const mongodb = require('./db/connect');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 8080;
const host = process.env.HOST || 'localhost';

const server = http.createServer(expressApp);

mongodb.initDb((err, mongodb) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Connected to DB and listening on ${port}`);
    }
  });

  
  // Start the server
  server.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}/api-docs`);
  });

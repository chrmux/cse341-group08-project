const express = require('express');
const bodyParser = require('body-parser');
const router = require("./routes");

const app = express();
app.use(express.json());

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use(router);

  
module.exports = app;


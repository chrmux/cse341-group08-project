const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require("./routes");

const app = express();
app.use(express.json());

app.use(cors());

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use(router);

  
module.exports = app;

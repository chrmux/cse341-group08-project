const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const mongodb = require('./db/connect');
const { configDotenv } = require('dotenv');
const cors = require('cors');

// Set up env
configDotenv({path: './sample.env'});

const app = express();
const port = 8080;

// Swagger definition
const swaggerDefinitionPath = path.join(__dirname, 'swagger.json');
const swaggerDefinition = JSON.parse(fs.readFileSync(swaggerDefinitionPath, 'utf8'));

// Serve swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

// Set up database
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.err(err);
  } else {
    console.log(`Connected to DB and listening on ${port}`);
  }
});

// Define routes


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

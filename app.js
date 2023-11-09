const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8080;

// Swagger definition
const swaggerDefinitionPath = path.join(__dirname, 'swagger.json');
const swaggerDefinition = JSON.parse(fs.readFileSync(swaggerDefinitionPath, 'utf8'));

// Serve swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

// Define routes


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

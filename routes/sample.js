/**
 * @swagger
 * /sample:
 *   get:
 *     description: Returns a sample response
 *     responses:
 *       200:
 *         description: Successful response
 */
const express = require('express');
const router = express.Router();

router.get('/sample', (req, res) => {
  res.json({ message: 'This is a sample response' });
});

module.exports = router;

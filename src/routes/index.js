const express = require('express');
const router = express.Router();


router.use('/', require('./swagger'));
//router.use('/users', require('./users'));
//router.use('/recipes', require('./recipes'));
//router.use('/ingredients', require('./ingredients'));

router.use((req, res, next) => {
    const error = new Error("Route not found");
    error.status = 404;
    next(error);
});


module.exports = router;
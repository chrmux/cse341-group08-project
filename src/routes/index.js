const express = require('express');
const router = express.Router();


router.use('/', require('./swagger'));
//router.use('/users', require('./users'));
router.use('/keywords', require('./keywords'));
router.use('/ingredients', require('./ingredients'));
router.use('/recipes', require('./recipes'));
router.use('/user', require('./users'));

router.use((req, res, next) => {
    const error = new Error("Route not found");
    error.status = 404;
    next(error);
});


module.exports = router;
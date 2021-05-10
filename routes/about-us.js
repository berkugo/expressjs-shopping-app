const express = require('express');
const router = express.Router();

// mounts to /about-us
router.get('/', (req, res, next) => {
    res.render('about-us', {
        title: ' about-us',

    });
});

module.exports = router;
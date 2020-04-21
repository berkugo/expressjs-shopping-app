const express = require('express');
const router = express.Router();
const util = require('../lib/util');
const langList = ['tr', 'en', 'ru', 'uk', 'ar', 'it'];

// mounts to /lang/language-id
router.post('/:lang', (req, res, next) => {
    const valid = langList.some((lang) => {
        return (lang === req.params.lang);
    });
    if (valid) {
        req.session.siteLang = req.params.lang;
        res.end();
    } else {
        next();
    }
});

module.exports = router;

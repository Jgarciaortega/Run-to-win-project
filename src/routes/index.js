const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index',{
        style: '/css/home.css',
        js1: '/js/index.js'
    });
});

module.exports = router;



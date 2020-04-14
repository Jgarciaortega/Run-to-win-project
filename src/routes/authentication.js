const express = require('express');
const router = express.Router();

router.get('/authentication', (req,res) => {
    res.render('authentication/login',{
        style: 'css/login.css',
        js1: 'js/auth.js'
    });
})

module.exports = router;
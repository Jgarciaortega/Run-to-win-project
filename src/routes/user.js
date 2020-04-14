const express = require('express');
const router = express.Router();
const User = require('../controllers/user.controllers');

router.get('/user', (req, res) => {
    res.render('user/userProfile', {
        style: '/css/user.css',
        js1: '/js/userHeader.js',
        js2: '/js/userProfile.js',
        chart: "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js"
    });
})

router.get('/user/messages', (req,res) =>{
    res.render('user/messages', {
        style: '/css/user.css',
        js1: '/js/userHeader.js',
        js2: '/js/message.js',
        chart: "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js"
    });
})

router.get('/user/notifications', (req,res) =>{
    res.render('user/notifications', {
        style: '/css/user.css',
        js1: '/js/userHeader.js',
        chart: "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js"
    });
})

router.post('/user/isValidUser', User.isValidUser);
router.post('/user/createUser', User.createUser);
router.post('/user/existEmail', User.existEmail);
router.post('/user/existNickname', User.existNickname);
router.post('/user/findById', User.findById);

module.exports = router;
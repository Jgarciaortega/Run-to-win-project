const express = require('express');
const router = express.Router();
const User = require('../controllers/user.controllers');

router.get('/user', (req,res) => {
    res.render('user/profile',{
        style: '/css/user.css'
    });
})

router.post('/user/isValidUser', User.isValidUser);
router.post('/user/createUser', User.createUser);
router.post('/user/existEmail', User.existEmail);
router.post('/user/existNickname', User.existNickname);


module.exports = router;
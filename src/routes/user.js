const express = require('express');
const router = express.Router();
const User = require('../controllers/user.controllers');
const passport = require("passport");
const Model = require('../model/model');
const optsCookie = {
    expires: new Date(Date.now() + 3600000),
    secure: false, // set to true if your using https
    httpOnly: true,
};

router.get('/user/profile', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.render('user/userProfile', {
            style: '/css/user.css',
            js1: '/js/userHeader.js',
            js2: '/js/userProfile.js',
            chart: "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js"
        });
    })

router.get('/user/messages', (req, res) => {
    res.render('user/messages', {
        style: '/css/user.css',
        js1: '/js/userHeader.js',
        js2: '/js/message.js',
        chart: "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js"
    });
})

router.get('/user/notifications', (req, res) => {
    res.render('user/notifications', {
        style: '/css/user.css',
        js1: '/js/userHeader.js',
        chart: "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js"
    });
})

router.get('/user/userConfiguration', (req, res) => {
    res.render('user/userConfiguration', {
        style: '/css/user.css',
        js1: '/js/userHeader.js',
        js2: '/js/confProfile.js',
        chart: "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js"
    });
})

router.post("/user/logIn", (req, res, next) => {
    passport.authenticate(
        "local-login",
        { session: false },
        (error, user, info) => {
            if (error || !user) {
                return res.status(400).send(info);
            }
            req.logIn(user, (error) => {
                const token = Model.createWebToken({
                    id: user.id,
                });
                res.cookie("jwt", token, optsCookie);
                info.cookies = optsCookie;
                info.user = user;
                res.status(200).send(info);
            });
        }
    )(req, res, next);
});

router.get("/user/logOut", (req, res) => {
    res.clearCookie("jwt");
    return res.status(200).redirect('/');
  });


router.get('/user/findById/:id', passport.authenticate('jwt', { session: false }), User.findById);
router.get('/user/findByNickname/:nickname', passport.authenticate('jwt', { session: false }), User.findByNicknameByClient);
router.post('/user/createUser', User.createUser);
router.post('/user/existEmail', User.existEmail);
router.post('/user/existNickname', User.existNickname);
router.put('/user/updateUser/:id', User.updateUser);


module.exports = router;
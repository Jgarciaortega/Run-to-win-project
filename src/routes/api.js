const express = require('express');
const router = express.Router();
const passport = require('passport');

const Message = require('../controllers/messages.controllers');
const Rutine = require('../controllers/rutines.controllers');


router.post("/api/createConversation",
passport.authenticate("jwt", { session: false }),Message.createConversation);

router.get("/api/getConversation/:id",
passport.authenticate("jwt", { session: false }),Message.getConversation);

router.post("/api/sendMessage",
passport.authenticate("jwt", { session: false }),Message.createMessage);

router.get("/api/getMessages/:id",
passport.authenticate("jwt", { session: false }),Message.getMessages);

router.get("/api/countMessages/:id",
passport.authenticate("jwt", { session: false }),Message.countMessages);

router.put("/api/updateConversation/:id/:userId",
passport.authenticate("jwt", { session: false }),Message.updateConversation);

router.delete("/api/deleteConversation/:id",
passport.authenticate("jwt", { session: false }),Message.deleteConversation);

router.get("/api/rutine/:id",
passport.authenticate("jwt", { session: false }),Rutine.findRutineById);

router.get(
    "/api/prueba/:dia",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {

        res.send({ msg: 'hola mundo'});

    });

    //     let Angel = req.params.dia;
    //     res.send({
    //         type: 'bar',
    //         data: {
    //             labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', Angel],
    //             datasets: [{
    //                 label: 'Activ',
    //                 data: [12, 19, 3, 5, 2, 3, 5],
    //                 backgroundColor: [
    //                     'rgba(255, 99, 132, 0.2)',
    //                     'rgba(54, 162, 235, 0.2)',
    //                     'rgba(255, 206, 86, 0.2)',
    //                     'rgba(75, 192, 192, 0.2)',
    //                     'rgba(153, 102, 255, 0.2)',
    //                     'rgba(255, 159, 64, 0.2)'
    //                 ],
    //                 borderColor: [
    //                     'rgba(255, 99, 132, 1)',
    //                     'rgba(54, 162, 235, 1)',
    //                     'rgba(255, 206, 86, 1)',
    //                     'rgba(75, 192, 192, 1)',
    //                     'rgba(153, 102, 255, 1)',
    //                     'rgba(255, 159, 64, 1)'
    //                 ],
    //                 borderWidth: 1
    //             }]
    //         },
    //         options: {
    //             scales: {
    //                 yAxes: [{
    //                     ticks: {
    //                         beginAtZero: true
    //                     }
    //                 }]
    //             }
    //         }
    //     })
    // })


module.exports = router;
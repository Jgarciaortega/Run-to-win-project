const express = require('express');
const router = express.Router();
const passport = require('passport');

const Message = require('../controllers/messages.controllers');
const Rutine = require('../controllers/rutines.controllers');
const Training = require('../controllers/trainings.controllers');

/* Rutas Conversaciones */ 
router.post("/api/createConversation",
passport.authenticate("jwt", { session: false }),Message.createConversation);

router.get("/api/getConversation/:id",
passport.authenticate("jwt", { session: false }),Message.getConversation);

router.get("/api/countConversations/:id",
passport.authenticate("jwt", { session: false }),Message.countConversations);

router.put("/api/updateConversation/:id/:userId",
passport.authenticate("jwt", { session: false }),Message.updateConversation);

/* Rutas Notificaciones */
router.get('/api/notifications', (req, res) => {
    res.render('api/notifications', {
        style: '/css/user.css',
        style2: '/css/header.css',
        style3: '/css/footer.css',
        style4: '/css/message.css',
        js1: '/js/userHeader.js',
        js2: '/js/notifications.js',
        chart: "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js"
    });
})

router.post("/api/createNotification",
passport.authenticate("jwt", { session: false }),Message.createNotification);

router.get("/api/countNotifications/:id",
passport.authenticate("jwt", { session: false }),Message.countNotifications);

router.get("/api/getNotifications/:id",
passport.authenticate("jwt", { session: false }),Message.getNotifications);

router.get("/api/getNotificationsByType/:id/:tipo",
passport.authenticate("jwt", { session: false }),Message.getNotificationByType);

router.delete("/api/deleteNotification/:id",
passport.authenticate("jwt", { session: false }),Message.deleteNotification);

/* Rutas Mensajes */
router.get('/api/messages', (req, res) => {
    res.render('api/messages', {
        style: '/css/user.css',
        style2: '/css/header.css',
        style3: '/css/footer.css',
        style4: '/css/message.css',
        js1: '/js/userHeader.js',
        js2: '/js/message.js',
        chart: "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js"
    });
})

router.post("/api/sendMessage",
passport.authenticate("jwt", { session: false }),Message.createMessage);

router.get("/api/getMessages/:id",
passport.authenticate("jwt", { session: false }),Message.getMessages);

/* Rutas Rutinas */
router.get("/api/rutine/:id",
passport.authenticate("jwt", { session: false }),Rutine.findRutineById);

/* Rutas Informes Entrenamiento */
router.get("/api/getTraining/:id",
passport.authenticate("jwt", { session: false }),Training.getTraining);


module.exports = router;
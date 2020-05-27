const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const path = require('path');

const Api = require('../controllers/api.controllers');

/* Rutas Subir Archivos */
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/public/assets/user_photos')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });
router.post('/api/uploadPhoto',
    passport.authenticate("jwt", { session: false }), upload.single('file'), Api.uploadPhoto);

/* Rutas Conversaciones */
router.post("/api/createConversation",
    passport.authenticate("jwt", { session: false }), Api.createConversation);

router.get("/api/getConversation/:id",
    passport.authenticate("jwt", { session: false }), Api.getConversation);

router.get("/api/countConversations/:id",
    passport.authenticate("jwt", { session: false }), Api.countConversations);

router.put("/api/updateConversation/:id/:userId",
    passport.authenticate("jwt", { session: false }), Api.updateConversation);

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
    passport.authenticate("jwt", { session: false }), Api.createNotification);

router.get("/api/countNotifications/:id",
    passport.authenticate("jwt", { session: false }), Api.countNotifications);

router.get("/api/getNotifications/:id",
    passport.authenticate("jwt", { session: false }), Api.getNotifications);

router.get("/api/getNotificationsByType/:id/:tipo",
    passport.authenticate("jwt", { session: false }), Api.getNotificationByType);

router.delete("/api/deleteNotification/:id",
    passport.authenticate("jwt", { session: false }), Api.deleteNotification);

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
    passport.authenticate("jwt", { session: false }), Api.createMessage);

router.get("/api/getMessages/:id",
    passport.authenticate("jwt", { session: false }), Api.getMessages);

/* Rutas Rutinas */
router.get("/api/findRutineById/:id",
    passport.authenticate("jwt", { session: false }), Api.findRutineById);

router.get("/api/findRutineByName/:name",
    passport.authenticate("jwt", { session: false }), Api.findRutineByName);

/* Rutas Informes Entrenamiento */
router.get("/api/getTraining/:id",
    passport.authenticate("jwt", { session: false }), Api.getTraining);

module.exports = router;
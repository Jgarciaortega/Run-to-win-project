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

/* Rutas Mensajes */
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
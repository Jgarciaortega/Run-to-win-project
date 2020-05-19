const model = require('../model/model');
const { format } = require('timeago.js');

/* Messages Metods */
exports.createNotification = async (req, res) => {
    const connection = await model.getConnection(); 
    const data = [req.body.contenido , req.body.id_destinatario,  req.body.tipo , req.body.id_remitente];
    const [rows] = await connection.execute("INSERT INTO notificaciones VALUES (NULL,?,?,?,now(),?)",data);
    
    connection.end();

    if(rows.affectedRows > 0) res.send(true);
    else res.send(false);
   
    
}

exports.createMessage = async (req, res) => {
    const connection = await model.getConnection();

    const data = ['"' + req.body.messageTxt + '"', req.body.id_addressee, req.body.id_conversation, req.body.user.id];

    const [rows] = await connection.execute("INSERT INTO mensaje VALUES (NULL,?,?,now(),?,?)", data);
    connection.end();

    if (rows.affectedRows > 0) res.send(true);
    else  res.send(false);
   
}

exports.getMessages = async (req, res) => {

    const connection = await model.getConnection();
    const sql = "SELECT * from mensaje WHERE id_conversacion=" + req.params.id + " ORDER BY fecha_envio ASC";
    const [rows] = await connection.execute(sql);
    connection.end();
    parseDate(rows);
    res.send(rows);

}

/* Conversation Metods */
exports.createConversation = async (req, res) => {
    const connection = await model.getConnection();
    const data = [req.body.id_user1, req.body.id_user2];
    const sql = "INSERT INTO conversacion (id_usuario1,id_usuario2) VALUES (" + req.body.id_user1 + " ," + req.body.id_user2 + ")";

    connection.query(sql, function (err, result) {
        if (err) throw err;
        res.send({ id_conversation: result.insertId });
    });

}

exports.getConversation = async (req, res) => {

    const connection = await model.getConnection();
    const sql = "SELECT * from conversacion WHERE id_usuario1=" + req.params.id + " or id_usuario2=" + req.params.id;
    const [rows] = await connection.execute(sql);
    connection.end();
    res.send(rows);

}

exports.updateConversation = async (req, res) => {

    const connection = await model.getConnection();
    const conversationId = req.params.id;
    const userId = req.params.userId;
    const sql1 = "UPDATE conversacion set id_usuario1=-1 WHERE id=" + conversationId + " and id_usuario1=" + userId;
    const sql2 = "UPDATE conversacion set id_usuario2=-1 WHERE id=" + conversationId + " and id_usuario2=" + userId;
    await connection.execute(sql1);
    await connection.execute(sql2);
    // si los dos usuarios se borran de la conversacion la borro y sus mensajes
    await this.deleteConversation(conversationId);

}

exports.deleteConversation = async (conversationId) => {

    const connection = await model.getConnection();
    const sql1 = "SELECT id_usuario1, id_usuario2 from conversacion WHERE id= " + conversationId;
    const sql2 = "DELETE FROM mensaje WHERE id_conversacion=" + conversationId;
    const sql3 = "DELETE FROM conversacion WHERE id=" + conversationId;

    const [rows] = await connection.execute(sql1);

    // campo usuario a -1 es que usuario borro conversacion. Si dos a -1 nos cargamos conversacion y mensajes
    if (rows[0].id_usuario1 == -1 && rows[0].id_usuario2 == -1) {

        const res1 = await connection.execute(sql2)
        const res2 = await connection.execute(sql3);

        res.send(true);

    }
    res.send(false);
}

exports.countConversations = async (req, res) => {

    const connection = await model.getConnection();
    const sqlQuery = "SELECT COUNT(id) as total FROM `conversacion` WHERE id_usuario1=" + req.params.id + " or id_usuario2=" + req.params.id;
    const [rows] = await connection.execute(sqlQuery);
    connection.end();
    res.send(rows[0]);
}

/* Notification Metods */
exports.deleteNotification = async (req, res) => {

    const connection = await model.getConnection();
    const sql = "DELETE FROM notificaciones WHERE id=" + req.params.id;
    const [rows] = await connection.execute(sql);
    connection.end();

    if(rows.affectedRows > 0) res.send({msg: 'borrada'});
    
}

exports.countNotifications = async (req, res) => {

    const connection = await model.getConnection();
    const sqlQuery = "SELECT COUNT(id) as total FROM `notificaciones` WHERE id_destinatario=" + req.params.id;
    const [rows] = await connection.execute(sqlQuery);
    connection.end();
    res.send(rows[0])
}

exports.getNotifications = async (req, res) => {

    const connection = await model.getConnection();
    const sql = "SELECT * from notificaciones WHERE id_destinatario=" + req.params.id;
    const [rows] = await connection.execute(sql);
    connection.end();
    parseDate(rows);
    res.send(rows);

}

exports.getNotificationByType = async (req, res) => {

    const connection = await model.getConnection();
    const sql = 'SELECT * from notificaciones WHERE id_destinatario=' + req.params.id + ' and tipo="' + req.params.tipo + '"'; 
    console.log(sql);
    
    const [rows] = await connection.execute(sql);
    connection.end();
    parseDate(rows);
    res.send(rows);
}

/* Upload Image */
exports.uploadPhoto = (req, res) => {

    console.log(`Storage location is ${req.hostname}/${req.file.path}`);
    res.send(req.file);

}

/* Rutines Metods */
exports.findRutineById = async (req, res) => {
    const connection = await model.getConnection();
    const [
        rows,
    ] =
        await connection.execute("SELECT * FROM `rutinas_ejercicios` WHERE `id` = ?", [req.params.id]);
    connection.end();
  
    if (rows.length) {
        return res.send(rows[0]);       
    }
    return { out: false }; 
}

/* Training Metods */
exports.getTraining = async (req, res) => {
    const connection = await model.getConnection();
    const sql = "SELECT * from registros_entrenamiento WHERE id_usuario=" + req.params.id;
    const [rows] = await connection.execute(sql);

    if (rows.length) res.send(rows);
    else res.send(false);

};


const parseDate = (rows) => {
    rows.forEach(row => {
        let timeagoFormat = format(row.fecha_envio);
        row.fecha_envio = timeagoFormat;
    });

    return rows;
}
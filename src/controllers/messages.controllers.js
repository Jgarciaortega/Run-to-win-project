const model = require('../model/model');
const { format } = require('timeago.js');

exports.createMessage = async (req, res) => {
    const connection = await model.getConnection();
    const data = ['"'+req.body.messageTxt+'"',2,false,req.body.user.id];

    await connection.execute("INSERT INTO mensaje VALUES (NULL,?,?,now(),?,?)",
    data);
    connection.end();
   
}

exports.getMessages = async (req, res) => {
  
    const sqlQuery = "SELECT mensaje.id,contenido,fecha_envio,id_usuario FROM `mensaje` INNER JOIN usuario ON id_destinatario=usuario.id WHERE usuario.id= ?";
    const connection = await model.getConnection();
    const [rows] = await connection.execute(sqlQuery,[req.params.id]);
    parseDate(rows);
    connection.end();
    res.send(rows)

}

exports.deleteMessage = async (req, res) => {

    const connection = await model.getConnection();
    let idMsg = req.params.id;
    let sqlQuery = "DELETE FROM mensaje WHERE id=" + idMsg;
    console.log(sqlQuery);

    connection.query(sqlQuery, function (err, result) {
        if (err) res.send(false);
        res.send(true);
        console.log("Number of records deleted: " + result.affectedRows);
      });

};

exports.countMessages = async (req, res) => {

    const connection = await model.getConnection();
    const sqlQuery = "SELECT COUNT(id) as total FROM `mensaje` WHERE id_destinatario = ?";
    const [rows] = await connection.execute(sqlQuery,[req.params.id]);
    connection.end();
    res.send(rows[0])
}

const parseDate = (rows) =>{
    rows.forEach(row => {
        let timeagoFormat = format(row.fecha_envio);
        row.fecha_envio = timeagoFormat;
    });

   return rows;
}
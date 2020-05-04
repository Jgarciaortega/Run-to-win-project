const model = require('../model/model');

exports.getTraining = async (req, res) => {
    const connection = await model.getConnection();
    const sql = "SELECT * from registros_entrenamiento WHERE id_usuario=" + req.params.id;
    const [rows] = await connection.execute(sql);

    if (rows.length) res.send(rows);
    else res.send(false);

};
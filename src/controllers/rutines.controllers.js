const model = require('../model/model');

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
const model = require('../model/model');

exports.findByNicknameByClient = async (req, res) => {
    const connection = await model.getConnection();
    const [
        rows,
    ] =
        await connection.execute("SELECT * FROM `usuario` WHERE `nickname` = ?", [req.params.nickname]);
    connection.end();

    if (rows.length) {
        const user = parseUser(rows[0]);
        return res.send(user);
    }

    return { out: false };

};

exports.findByNickname = async (nickname) => {
    const connection = await model.getConnection();
    const [
        rows,
    ] = await connection.execute(
        "SELECT * FROM `usuario` WHERE `nickname` = ?",
        [nickname]
    );
    connection.end();
    if (rows.length) {
        const user = parseUser(rows[0]);
        return user;
    }
    return false;
};

exports.findByIdByPassport = async (id) => {

    const connection = await model.getConnection();
    const [
        rows,
    ] =
        await connection.execute("SELECT * FROM `usuario` WHERE `id` = ?", [id]);
    connection.end();

    if (rows.length) {
        const user = parseUser(rows[0]);
        return user;
    }

    return { out: false };

}

exports.findById = async (req, res) => {

    const user = await this.findByIdByPassport(req.params.id);
    user.password = '';
    res.send(user);

}

exports.createUser = async (req, res) => {

    const connection = await model.getConnection();
    const password = model.getEncrypted(req.body.password);
    const sql = 'INSERT INTO usuario (id, nombre, apellidos, email, password, status, nickname, imagen, logros, puntuacion) ' +
        'VALUES (null,"' + req.body.nombre + '","' + req.body.apellidos + '","' + req.body.email + '","' + password + '","BEGINNER","' +
        req.body.nickname + '", "/assets/user_photos/yo.jpg",0,0)';

    const rows = await connection.execute(sql);

    if (rows.affectedRows > 0) res.send(true);
    else res.send(false);

    // /assets/user_photos/yo.jpg
    // /assets/user_photos/Schwarzy.jpg


}

exports.existEmail = async (req, res) => {

    const connection = await model.getConnection();
    let sql = `SELECT * FROM usuario WHERE email ='${req.body.email}'`;

    await connection.query(sql, (error, results) => {

        if (results.length != 0) return res.send({ msg: true });
        else return res.send({ msg: false });

    })
}

exports.existNickname = async (req, res) => {
    const connection = await model.getConnection();
    let sql = `SELECT * FROM usuario WHERE nickname ='${req.body.nickname}'`;

    await connection.query(sql, (error, results) => {

        if (results.length != 0) return res.send({ msg: true });
        else return res.send({ msg: false });

    })

}

exports.updateUser = async (req, res) => {

    const connection = await model.getConnection();
    const sql = "UPDATE usuario set " + req.body.name + "=" + req.body.value + " WHERE id=" + req.params.id;
    const rows = await connection.execute(sql);

    console.log(rows);

    if (rows.affectedRows > 0) res.send(true);
    else res.send(false);

}


const parseUser = results => {

    let user = {
        id: results.id,
        nombre: results.nombre,
        apellidos: results.apellidos,
        email: results.email,
        status: results.status,
        password: results.password,
        nickname: results.nickname,
        imagen: results.imagen,
        logros: results.logros,
        id_strava: results.id_strava,
        peso: results.peso,
        altura: results.altura,
        fecha_registro: results.fecha_registro,
        pulsaciones: results.pulsaciones_reposo,
        tension_alta: results.tension_alta,
        tension_baja: results.tension_baja,
        sexo: results.sexo,
        edad: results.edad,
        puntuacion: results.puntuacion
    };

    return user;

}

const model = require('../model/model');

 exports.findByIdByClient = async (req, res) => {
    const connection = await model.getConnection();
    const [
        rows,
    ] =
        await connection.execute("SELECT * FROM `usuario` WHERE `nickname` = ?", [req.params.nickname]);
    connection.end();

    if (rows.length) {
        const user = parseUser(rows[0]);
        console.log(user);
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
    user.password='';
    res.send(user);

}

exports.createUser = async (req, res) => {
    const connection = await model.getConnection();
    console.log(req.body);
    
    const sql = "INSERT INTO usuario VALUES (NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,now(),?)";
    const password = model.getEncrypted(req.body.password);
    const data = [req.body.nombre, req.body.apellidos, req.body.email, password, 'beginner', req.body.nickname,
        '/assets/user_photos/yo.jpg', 0, null, 79.8, 179, 65, 125, 85, 'hombre',null];
    res.send({msg: 'Antes de nada'})
   
    await connection.execute(sql, data);

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
        fecha_registro: results.fecha_registro
    };

    return user;

}

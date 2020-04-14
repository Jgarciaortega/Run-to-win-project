const model = require('../model/model');

exports.isValidUser = async (req, res) => {

    const connection = await model.getConnection();
    connection.connect(async err => {
        if (err) {
            return console.error(
                "Database not connected!  : " +
                JSON.stringify(err, undefined, 2)
            );
        }
        console.log(req.body);

        const { nickname, password } = req.body;

        let sql = `SELECT * FROM usuario WHERE nickname ='${nickname}'`;

        connection.query(sql, (error, results) => {
            if (error) {
                return console.error(error.message);
            }

            //si no existe el usuario...
            if (results.length == 0) {
                return res.send({ msg: "Usuario not valid" });
            }

            const user = parseUser(results[0]); 
          
            //comprobamos si coinciden la password
            if (model.isCorrectPassword(password, results[0].password)) {
                console.log('usuario correcto')
                return res.json({
                    code: 200,
                    user
                });
            } else {
                return res.json(401);
            };

        });
    });
};

exports.createUser = async (req, res) => {

    const connection = await model.getConnection();
    const sql = "INSERT INTO usuario VALUES (NULL,?,?,?,?,?,?,?,?,?,?,?,now())";
    const password = model.getEncrypted(req.body.password);
    const data = [req.body.nombre, req.body.apellidos, req.body.email, password, 'beginner', req.body.nickname,
    '/assets/img/default.png',0,null,0,0];

    connection.query(sql, data, (err, results, fields) => {

        console.log('Lista:' + results.insertId);

    });

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

exports.findById = async (req, res) => {

    const connection = await model.getConnection();
    let sql = `SELECT * FROM usuario WHERE id ='${req.body.id}'`;

    await connection.query(sql, (error, results) => {
        
        const user = parseUser(results[0]);
        console.log(user);
        
        if (results.length != 0) return res.json( user );
        else return res.json({ msg: false });

    })

}

const parseUser = results =>{

    let user = {
        id: results.id,
        nombre: results.nombre,
        apellidos: results.apellidos,
        email: results.email,
        status: results.status,
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

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
            //comprobamos si coinciden la password
            if (model.isCorrectPassword(password, results[0].password)) {
                console.log('usuario correcto')
                return res.send({ msg: "Usuario correcto" });
            } else {
                return res.send({ msg: "Contraseña incorrecta" });
            };

        });
    });
};

exports.createUser = async (req, res) => {

    const connection = await model.getConnection();
    const sql = "INSERT INTO usuario VALUES (NULL,?,?,?,?,?,?)";
    const password = model.getEncrypted(req.body.password);
    const data = [req.body.nombre,req.body.apellidos,req.body.email,password,'beginner',req.body.nickname];

    connection.query(sql,data, (err,results,fields) => {

        console.log('Lista:'+ results.insertId);
        
    });

}

exports.existEmail = async (req, res) => {

    const connection = await model.getConnection();
    let sql = `SELECT * FROM usuario WHERE email ='${req.body.email}'`;
  
    await connection.query(sql, (error,results) => {

        if(results.length != 0) return res.send({msg:true});
        else return res.send({msg:false});

    })

}

exports.existNickname = async (req, res) => {

    const connection = await model.getConnection();
    let sql = `SELECT * FROM usuario WHERE nickname ='${req.body.nickname}'`;
  
    await connection.query(sql, (error,results) => {

        if(results.length != 0) return res.send({msg:true});
        else return res.send({msg:false});

    })

}

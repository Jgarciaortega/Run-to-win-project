const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports.getConnection= async function(){

    const mysql = require('mysql2/promise');
    
    let config = {
        host     : 'localhost',
        user     : 'admin',
        password : 'admin',
        database : 'db_rtw',
        insecureAuth : true
    };

    return await mysql.createConnection(config);
}

module.exports.getEncrypted = function (password){
    const saltRounds = bcrypt.genSaltSync(13);
    return bcrypt.hashSync(password, saltRounds);
}

module.exports.isCorrectPassword = (myPlaintextPassword, hash) => {  
    return bcrypt.compareSync(myPlaintextPassword, hash);
};

module.exports.createWebToken = payload => {
    return jwt.sign(payload, "dawdiw", {
        expiresIn: 60 * 60 * 24 
    });
};

module.exports.verifyToken = token => {
    return jwt.verify(token, "dawdiw", (err, decoded) => decoded);
};

const bcrypt = require('bcrypt');

module.exports.getConnection=function(){

    const mysql = require('mysql');
    
    let config = {
        host     : 'localhost',
        user     : 'admin',
        password : 'admin',
        database : 'db_rtw',
        insecureAuth : true
    };

    return mysql.createConnection(config);
}

module.exports.getEncrypted = function (password){
    const saltRounds = bcrypt.genSaltSync(13);
    return bcrypt.hashSync(password, saltRounds);
}

module.exports.isCorrectPassword = (myPlaintextPassword, hash) => {
    return bcrypt.compareSync(myPlaintextPassword, hash);
};
const model = require('../model/model');

exports.createMessage = async (req, res) => {
    const connection = await model.getConnection();
    const data = ['"'+req.body.messageTxt+'"',1,false,req.body.user.id];

    await connection.execute("INSERT INTO mensaje VALUES (NULL,?,?,now(),?,?)",
    data);
    connection.end();
   
}
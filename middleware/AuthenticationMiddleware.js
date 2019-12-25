const domain = require('../model/index');


function authenticateUser(req,res,next){

    console.log('>>> In authentication middleware >>>',req.query);
    next();
}

module.exports = {

    authenticateUser: authenticateUser,
};
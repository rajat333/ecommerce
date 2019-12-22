
function authenticateUser(req,res,next){

    console.log('>>> In authentication middleware >>>');
    next();
}


module.exports = {

    authenticateUser: authenticateUser,
};
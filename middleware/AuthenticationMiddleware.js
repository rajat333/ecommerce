const domain = require('../model/index');
const jwt = require('jsonwebtoken');
const configrationHolder = require('../configrations/ApplicationMessage');
const setResponse = require('../application-utilities/SetResponse');
function authenticateUser(req,res,next){

    jwt.verify( req.headers.authorization,configrationHolder.Keys.tokenSecretKey,async function(err,data){
        if(err){
            setResponse.setError( configrationHolder.Error.NotAuthorized,
                configrationHolder.InternalAppMessage.NotAuthorized,
                {},true,res);
        }else{
            //find Login User 
            let loginUser = await domain.User.find({ email: data.email }).lean();
            req.loginUser = loginUser[0];
            next();
        }
    })
}

module.exports = { 

    authenticateUser: authenticateUser,
};
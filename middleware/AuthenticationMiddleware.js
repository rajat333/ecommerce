const domain = require('../model/index');
const jwt = require('jsonwebtoken');
const configrationHolder = require('../configrations/ApplicationMessage');
const setResponse = require('../application-utilities/SetResponse');
function authenticateUser(req,res,next){

    console.log('>>> In authentication middleware >>>',req.headers.authorization);
    jwt.verify( req.headers.authorization,configrationHolder.Keys.tokenSecretKey,async function(err,data){
        console.log("jwt verification ",err,data);
        if(err){
            console.log('error occur');
            setResponse.setError( configrationHolder.Error.NotAuthorized,
                configrationHolder.InternalAppMessage.NotAuthorized,
                {},true,res);
        }else{
            console.log("proceed further");
            //find Login User 
            let loginUser = await domain.User.find({ email: data.email }).lean();
            console.log("Login User",loginUser[0]);
            req.loginUser = loginUser[0];
            next();
        }
    })
}

module.exports = { 

    authenticateUser: authenticateUser,
};
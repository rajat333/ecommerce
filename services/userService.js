const async = require('async');
const domain = require('../model/index');
const jwt = require('jsonwebtoken');
const userValidation = require('../application-utilities/UserValidation');
const setResponse = require('../application-utilities/SetResponse');
const configrationHolder  = require('../configrations/ApplicationMessage'); 


async function registerUser( bodyData,res){

    var isValid  =  userValidation.registerValidation(bodyData);   
    if(!isValid){
        setResponse.setError( configrationHolder.Error.ValidationFail,
                configrationHolder.InternalAppMessage.ValidationFail,
                {},true,res);
    }else{
        try{
            var userExistWithUserName =  await domain.User.find({ email: { $regex: bodyData.email, $options:'i' } });
            if(userExistWithUserName.length > 0){
                setResponse.setError( configrationHolder.Error.UserExist,
                        configrationHolder.InternalAppMessage.UserExist,{},true,res );

            }else{
                let userObj = new domain.User( bodyData);
                userObj.save(function(err,result){
                    if(err) {
                        setResponse.setError(  configrationHolder.Error.ExceptionOccur,
                                configrationHolder.InternalAppMessage.ExceptionOccur,
                                {},true,res); 
                    }
                    else{
                        let data  = result.toObject();
                        setResponse.setError(  configrationHolder.Success.Register,
                            configrationHolder.InternalAppMessage.Register,
                            data,false,res); 
                    }
                });
            }
            
        
            }catch(err){
                setResponse.setError( configrationHolder.Error.ExceptionOccur,
                    configrationHolder.InternalAppMessage.ExceptionOccur,
                    {}, true,res);
            }
    }

    
};

async function login(bodyData, res){

    let isValid = userValidation.loginValidation(bodyData);
    if(!isValid){
        setResponse.setError( configrationHolder.Error.ValidationFail,
                configrationHolder.InternalAppMessage.ValidationFail,
                {},true,res);
    }else{
        try {
            let validUser = await domain.User.find({ email: { $regex: bodyData.email , $options:'i' }, password: bodyData.password  });
            if(validUser.length > 0){
              // create token and share details
              var JWTToken = jwt.sign({
                   name: validUser[0].name,
                   email: validUser[0].email,
                   mobile: validUser[0].mobile,
              },
               configrationHolder.Keys.tokenSecretKey   , {
                  expiresIn: configrationHolder.Keys.tokenSecretTime
              });
                  
              setResponse.setSuccess( configrationHolder.Success.Login,
                      configrationHolder.InternalAppMessage.Login,
                      {  token: JWTToken, name: validUser[0].name, username: validUser[0].username,
                          email: validUser[0].email, mobile: validUser[0].mobile
                      }, false,res);
              }else{
                  setResponse.setError( configrationHolder.Error.LoginFail,
                      configrationHolder.InternalAppMessage.LoginFail,
                      { }, true, res );
              }
          }catch(err){
              setResponse.setError( configrationHolder.Error.ExceptionOccur,
                      configrationHolder.InternalAppMessage.ExceptionOccur,
                      {}, true,res);
          }
    }


}
module.exports = {
    // userAction: userAction,
    registerUser : registerUser,
    login: login,
}
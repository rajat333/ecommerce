var async = require('async');
var domain = require('../model/index');
var jwt = require('jsonwebtoken');
var userValidation = require('../application-utilities/UserValidation');
var setResponse = require('../application-utilities/SetResponse');
var configrationHolder  = require('../configrations/ApplicationMessage'); 


async function registerUser( bodyData,res){

    console.log('inside user service');
    var isValid  =  userValidation.registerValidation(bodyData);   
    console.log('isValid >>> ',isValid);
    if(!isValid){
        setResponse.setError( configrationHolder.Error.ValidationFail,
                configrationHolder.InternalAppMessage.ValidationFail,
                {},true,res);
    }else{
        try{

            var userExistWithUserName =  await domain.User.find({ username: { $regex: bodyData.username, $options:'i' } });
            if(userExistWithUserName.length > 0){
                setResponse.setError( configrationHolder.Error.UserExist,
                        configrationHolder.InternalAppMessage.UserExist,{},true,res );

            }else{
                var userObj = new domain.User( bodyData);
        
                userObj.save(function(err,result){
                    if(err) {
            
                        setResponse.setError(  configrationHolder.Error.ExceptionOccur,
                                configrationHolder.InternalAppMessage.ExceptionOccur,
                                {},true,res); 
                    }
                    else{
                        var data  = result.toObject();
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

    var isValid = userValidation.loginValidation(bodyData);

    if(!isValid){
        setResponse.setError( configrationHolder.Error.ValidationFail,
                configrationHolder.InternalAppMessage.ValidationFail,
                {},true,res);
    }else{
        try {
            let validUser = await domain.User.find({ username: { $regex: bodyData.username , $options:'i' }, password: bodyData.password  });
            if(validUser.length > 0){
              // create token and share details
              var JWTToken = jwt.sign({
                   name: validUser[0].name,
                   username: validUser[0].username,
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
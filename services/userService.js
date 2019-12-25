var async = require('async');
var domain = require('../model/index');
var jwt = require('jsonwebtoken');
var userValidation = require('../application-utilities/UserValidation');
var setResponse = require('../application-utilities/SetResponse');
var configrationHolder  = require('../configrations/ApplicationMessage'); 


async function registerUser( bodyData,res){

    var isValid  =  userValidation.registerValidation(bodyData);   
    console.log("isValid isValid isValid",isValid);
    if(!isValid){
        setResponse.setError( configrationHolder.Error.ValidationFail,
                configrationHolder.InternalAppMessage.ValidationFail,
                {},true,res);
    }else{
        try{
            var userExistWithUserName =  await domain.User.find({ email: { $regex: bodyData.email, $options:'i' } });
            console.log("userExistWithUserName userExistWithUserName",userExistWithUserName);
            if(userExistWithUserName.length > 0){
                setResponse.setError( configrationHolder.Error.UserExist,
                        configrationHolder.InternalAppMessage.UserExist,{},true,res );

            }else{
                let userObj = new domain.User( bodyData);
                userObj.save(function(err,result){
                    if(err) {
                        console.log("err err",err);
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
                console.log("exception",err);
                setResponse.setError( configrationHolder.Error.ExceptionOccur,
                    configrationHolder.InternalAppMessage.ExceptionOccur,
                    {}, true,res);
            }
    }

    
};

async function login(bodyData, res){

    let isValid = userValidation.loginValidation(bodyData);
    console.log("in Login isValid ",isValid)
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
                console.log("in final else");
                  setResponse.setError( configrationHolder.Error.LoginFail,
                      configrationHolder.InternalAppMessage.LoginFail,
                      { }, true, res );
              }
          }catch(err){
              console.log("in catch",err);
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
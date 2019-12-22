

var registerValidation = function(jsonData){
    console.log('registerValidation ');
    var keys  = Object.keys(jsonData);
     if( keys.includes('name') && keys.includes('username') 
     && keys.includes('password') && keys.includes('confirmPassword')
     && keys.includes('email') && keys.includes('mobile')
     ){

       let validPassword =  checkPassword( jsonData.password , jsonData.confirmPassword);
        console.log(' Pas word check  ',checkPassword( jsonData.password && jsonData.confirmPassword));
       let validEmail =  validateEmail( jsonData.email); 
        console.log('Email Check  >>>>',validateEmail( jsonData.email));

        if( validPassword && validEmail )
         return true;
        else 
         return false; 

    }
     else
      return false ; 
      
};

var checkPassword = function(password, confirmPassword){
    return ( password === confirmPassword) ? true : false;
}

var validateEmail = function(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

var loginValidation = function(jsonData){

     var keys  = Object.keys(jsonData);
     if( keys.includes('username') && keys.includes('password') )
      return true;
     else
      return false; 
};

module.exports = {

    registerValidation: registerValidation,
    loginValidation: loginValidation,
};

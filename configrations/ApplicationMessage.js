
var ErrorMessage = {

        ValidationFail: 'Please enter all the fields',
        LoginFail: 'Please enter valid username or password',
        UserExist: 'User Exist With this mailid. Please choose different mailid',
        ExceptionOccur : 'Sorry, we are facing some technical issue. Please try again later.',

};

var SuccessMessage = {

        Register: 'Successfully Register User',
        Login: 'Successfully Login User',    
};

var InternalAppMessage = {

       Login: 'App.Login.Success',
       Register: 'App.Register.Success',
       ValidationFail: 'App.Validation.Fail',
       ExceptionOccur: 'App.Exception.Error',
       LoginFail: 'App.Login.Fail', 
       UserExist: 'App.Username.Exist'
}

var Keys  = {

    tokenSecretKey :'bfashgdfyagfbasjkdgfawhskjfbasjkdfbkj',
    tokenSecretTime: '2h',
}

module.exports = {

       Error: ErrorMessage,
       Success: SuccessMessage,
       InternalAppMessage:  InternalAppMessage,
       Keys: Keys,
}
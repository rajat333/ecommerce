
var userService = require('../services/userService');
var authenticationMiddleware = require('../middleware/AuthenticationMiddleware');

var registerUser = function(req,res){
        userService.registerUser(req.body,res);
};

var login = function(req,res){
    userService.login(req.body,res);
};

module.exports = {
 
    // userAction: userAction,
    registerUser: registerUser,
    login: login,
}
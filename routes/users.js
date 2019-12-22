var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/userCtrl');
var authenticationMiddleware = require('../middleware/AuthenticationMiddleware');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('>>.In UserROuter with / path ');
  userCtrl.userAction(req,res,next);
  // res.send('sending user resource');
});

router.post('/registerUser',function(req,res,next){

    userCtrl.registerUser(req,res,next);
});

router.post('/login', authenticationMiddleware.authenticateUser,function(req,res,next){

  userCtrl.login(req,res);
});


module.exports = router;

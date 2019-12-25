var authenticationMiddleware = require('../middleware/AuthenticationMiddleware');
var userCtrl = require('../controllers/userCtrl');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/users/registerUser',userCtrl.registerUser);
router.post('/users/login',userCtrl.login);

router.post('/category/list',userCtrl.login);
router.post('/product/list',userCtrl.login);
router.post('/product/category',userCtrl.login);
router.post('/product/addtoCart',userCtrl.login);
router.post('/product/user',userCtrl.login);

// router.post('/users/registerUser',function(req,res,next){
//   console.log("in index file");
//   userCtrl.registerUser(req,res,next);
// });

module.exports = router;

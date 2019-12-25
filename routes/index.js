var authenticationMiddleware = require('../middleware/AuthenticationMiddleware');
var userCtrl = require('../controllers/userCtrl');
const productCtrl = require("../controllers/productCtrl");
const categoryCtrl = require("../controllers/categoryCtrl");
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/users/registerUser',userCtrl.registerUser);
router.post('/users/login',userCtrl.login);

router.post('/category/list',authenticationMiddleware.authenticateUser, categoryCtrl.listAllCategory);
router.post('/product/list',authenticationMiddleware.authenticateUser,productCtrl.listAllProduct);
router.post('/product/category',authenticationMiddleware.authenticateUser, productCtrl.getCategoryBasedProduct);
router.post('/product/addtoCart',authenticationMiddleware.authenticateUser,productCtrl.addtoCart);
router.post('/product/user',userCtrl.login);

// router.post('/users/registerUser',function(req,res,next){
//   console.log("in index file");
//   userCtrl.registerUser(req,res,next);
// });

module.exports = router;

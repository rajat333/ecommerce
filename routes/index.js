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

router.get('/category/list',authenticationMiddleware.authenticateUser, categoryCtrl.listAllCategory);
router.post('/category/insertion',authenticationMiddleware.authenticateUser, categoryCtrl.insertCategory);

router.get('/product/list',authenticationMiddleware.authenticateUser,productCtrl.listAllProduct);
router.post('/product/category',authenticationMiddleware.authenticateUser, productCtrl.getCategoryBasedProduct);
router.post('/product/addtoCart',authenticationMiddleware.authenticateUser,productCtrl.addtoCart);
router.post('/product/userCart',authenticationMiddleware.authenticateUser,productCtrl.getUserCart);
router.post('/product/addProduct',authenticationMiddleware.authenticateUser,productCtrl.addProduct);

module.exports = router;

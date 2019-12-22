var authenticationMiddleware = require('../middleware/AuthenticationMiddleware');
var userCtrl = require('../controllers/userCtrl');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

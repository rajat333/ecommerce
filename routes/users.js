var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/userCtrl');
var authenticationMiddleware = require('../middleware/AuthenticationMiddleware');

module.exports = router;

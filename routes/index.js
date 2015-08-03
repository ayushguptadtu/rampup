var express = require('express');
var router = express.Router();
var user = require('../api/user');
var nodemail = require('../api/nodemail');
//var signup = 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/home',user.func);

router.post('/forgot',function(req, res, next) {
  res.render('forgot');
});
router.post('/nodemailer',nodemail.mailer);

router.post('/signup',user.signup);
router.post('/save',user.save);

module.exports = router;

/*
function(req, res, next) {
  res.render('signup');
  next();*/
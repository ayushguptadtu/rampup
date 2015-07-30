var express = require('express');
var router = express.Router();
var user = require('../api/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/home',user.func);

router.post('/forgot',function(req, res, next) {
  res.render('forgot');
});

router.post('/signup',function(req, res, next) {
  res.render('signup');
});

module.exports = router;

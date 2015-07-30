'use strict';
var funct = require('../model/query');
var abc = {
	func: function(req, res, next) {
  //res.render('home');

  var d = funct(req.body.email);
  console.log(d);
}

};

module.exports = abc;
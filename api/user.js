'use strict';
var query = require('../model/query');
var user = {
	func: function(req, res, next) {
  //res.render('home');

  var d = query.fetch(req.body.email);
  //console.log(d);
}

};

module.exports = user;
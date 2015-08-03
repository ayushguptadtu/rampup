'use strict';
var query = require('../model/query');
var user = {
	func: function(req, res, next) {
    query.fetch(req.body.email,req.body.password,function(err,name)
  	{
      //	console.log(d);
      if(err) {
      	//alert('wrong email id');
      	console.log("err found!");
      	res.render('index');}
      	else if(name.length==0){
      		res.render('nomatch');
      	}
      else {
      	console.log("no error");
      	res.render('home');
      }
      	
  	});
  
	},


	signup: function(req,res){
		res.render('signup');
	},

	save: function(req,res){
		//res.render('signup');
		var email = req.body.email, 
		    name = req.body.name,
		    password = req.body.password;

		    console.log('email======',email);
		    query.check(email, function(err,rows){
		    	//
		    	if(rows.length!==0)
		    		{   console.log('rows==',rows);
		    		res.render('exists');
		    		//res.redirect('/');
		    	}
		    	else{
		    		query.insert(email,name,password,function(err,row)
		    	{
		    		if (err) {console.log('error while inserting')};
		    	});
		    	}
		    });

		    
		// enter in db 

		//res.redirect('/');
	}

};

module.exports = user;
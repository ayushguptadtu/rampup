'use strict';
var query = require('../model/query');
var user = {
	checkUser: function(email, password,cb) {
    query.fetch(email,password,function(err,name){
      //	console.log(d);
      if(err) {
      	//alert('wrong email id');
      	console.log("err found!");
        cb(err,null);}
      	//res.render('index');}
     // 	else if(name.length==0){
      //		res.render('nomatch');
     // 	}
      //else {
      	//console.log("no error");
        //router.use(session({secret: 'ssshhhhh'}));
      //	res.render('home');
      //}
      	else
          cb(null,name);
  	});
  
	},

	changePassword: function(email,password){
    query.update(email, password);
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
		    		query.insert(email,name,password,function(err,row){
		    		if (err) {console.log('error while inserting')};
            
            res.render('index');
            });
		    	}
		    });

		    
		// enter in db 

		//res.redirect('/');
	}

};

module.exports = user;
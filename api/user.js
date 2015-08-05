'use strict';
var query = require('../model/query');
var encrypt = require('./encryptPassword');
var validator = require("email-validator");
var user = {
	checkUser: function(email, password,cb) {
    //encrypt.cryptPassword(password, function(err,cryptedPassword){
      //if(err) console.log(err);
      //console.log(cryptedPassword);
    query.fetchPassword(email,function(err,passwordFetched){ //passwordFetched has password now
      //	console.log(d);
      if(err) {
      	//alert('wrong email id');
      	console.log("err found!");
        cb(err,null);  
      }

      	//res.render('index');}
     // 	else if(name.length==0){
      //		res.render('nomatch');
     // 	}
      //else {
      	//console.log("no error");
        //router.use(session({secret: 'ssshhhhh'}));
      //	res.render('home');
      //}

      	else{
          encrypt.comparePassword(password, passwordFetched[0].password, function(err,result){
            console.log('result==',result);
            if(err) console.log(err);
            cb(null, result);
          });
        }
          
  	});
    //});
        
	},

  

	changePassword: function(email,password){
    encrypt.cryptPassword(password, function(err,hashPassword){
      if(err) console.log(err);
      console.log(hashPassword);
    query.update(email, hashPassword);
  });
	},


	signup: function(req,res){
		res.render('signup');
	},

	save: function(req,res){
		//res.render('signup');
		var email = req.body.email, 
		    name = req.body.name,
        emailCheck = validator.validate(email);
        //console.log('emailCheck ==', emailCheck);
    if(!emailCheck) res.render('error');

    encrypt.cryptPassword(req.body.password, function(err,password){
      if(err) console.log(err);
      console.log(password);

		    //password = req.body.password;

		console.log('email======',email);
		query.check(email, function(err,rows){
		    	//
		  if(rows.length!==0){
        console.log('rows==',rows);
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

		});   
		// enter in db 

		//res.redirect('/');
	}

};

module.exports = user;
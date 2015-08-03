'use strict';

var conf = require('./connection');

var query={

fetch : function(email, password,cb)
{
//console.log(data);
var q = 'SELECT name from users where email = ? and password = ?';
console.log('q==',q);

conf.query(q,[email,password], function(err, rows) {
//connection.end();
//console.log(q);
  if (!err) {
    console.log('The solution is: ', rows);
    cb(null,rows); }
  else  {
    console.log('Error while performing Query.');
     cb(err,null); 
      }
    
});
//cb(rows);
},

update : function(email, password){
  var updateQuery = 'update users set password = ? where email = ?';
  conf.query(updateQuery,[password,email], function(err, rows){
    if(!err){
      console.log('new password is ', password);
    }
    else{
      console.log('error while updating password');
    }
  });
},

check : function(email,cb)
{
	var Query = 'SELECT name from users where email = ?';
	conf.query(Query,[email],function(err,rows){
		//console.log('conf.query===',Query);
		if(!err){
			//console.log('The solution is : ',rows);
			cb(null,rows);
		}
		else{
			console.log('error while performing check');
			cb(err,null);
		}

	});
},

insert : function(email, name, password,cb){
	var quer = 'insert into users values(?,?,?)';
	conf.query(quer,[name, email,password],function(err,rows){
		if(!err){
			console.log('insert successful ', email,name,password);
            cb(null,rows);
		}

	});
}


};

module.exports = query;



(function () {
  if (require.main === module) {
    

    query.insert('ayush.gupta117@gmail.com', 'ayush', 'ayush');
  }
}());


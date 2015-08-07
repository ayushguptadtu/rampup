'use strict';

var conf = require('./connection');

var query={

fetchPassword : function(email,cb)
{
//console.log(data);
var q = 'SELECT password, created_at from users where email = ?';
console.log('q==',q);

conf.query(q,[email], function(err, rows) {
//connection.end();
//console.log(q);
  if (!err && rows[0].password) {
    console.log('The solution is: ', rows);
    cb(null,rows); }
  else  {
    console.log('Error while performing Query.');
     cb(err,null); 
      }
    
});
//cb(rows);
},

fetchId : function(email, cb){
  var idQuery = 'SELECT id from users where email = ?';
  conf.query(idQuery, [email], function(err,rows){
    if(!err)
      cb(null,rows);
    else
      cb(err,null);
  });
},

fetchPost : function(uid,cb){
  var fetchPostQuery = 'SELECT post_data from posts where uid = ?';
  conf.query(fetchPostQuery, [uid], function(err,result){
    if(!err)
      cb(null,result);
  });
},

insertPost : function(uid,post,cb){
  var postQuery = 'update posts set post_data = ? where uid = ?';
  conf.query(postQuery,[post,uid],function(err,rows){
    if(err) {
      console.log('error while inserting post');
      cb(err);
    }
    else {console.log('no error while inserting post in',uid,post);
        cb(null);
       }
  });
},

//fetchDate : function()

insertDate : function(email,date){
  var dateQuery = 'update users set created_at = ? where email = ?';
  conf.query(dateQuery,[date,email], function(err, result){
    if(!err) console.log('date is set to', date);
    else console.log('error while inserting date');
  });
},

insertHash : function(email,hashLink){
  var hashQuery = 'update users set hash = ? where email = ?';
  conf.query(hashQuery,[hashLink,email],function(err,result){
    if(!err) console.log('hash is set to',hashLink);
    else console.log('error while inserting hash');
  });
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


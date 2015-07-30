'use strict';

var conf = require('./connection');

var query={

fetch : function(data)
{
console.log(data);
var q = 'SELECT * from users where email = "'+ data +'" ';
console.log(q);

conf.query(q, function(err, rows) {
//connection.end();
//console.log(q);
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
});
}
};

module.exports = query;


/*
(function () {
  if (require.main === module) {
    

    quer.fun('ayush.gupta117@gmail.com');
  }
}());
*/

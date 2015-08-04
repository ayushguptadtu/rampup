var bcrypt = require('bcrypt');
var passwordEncryption = {
cryptPassword : function(password, callback) {
   bcrypt.genSalt(10, function(err, salt) {
    if (err) 
      return callback(err);

    bcrypt.hash(password, salt, function(err, hash) {
      return callback(err, hash);
    });

  });
},

comparePassword : function(password, userPassword, callback) {
   bcrypt.compare(password, userPassword, function(err, isPasswordMatch) {
      if (err) 
        return callback(err);
      console.log('in password mathched : ',isPasswordMatch);
      return callback(null, isPasswordMatch);
   });
}
};
module.exports = passwordEncryption;



// (function(){
//    passwordEncryption.cryptPassword('ayush', function(err,data){
//     if(err) console.log(err);
//    console.log(data);
   
//    passwordEncryption.comparePassword('ayush',data , function(err,result){
//     if(err) console.log(err);
//     console.log(result);
//     });
//    });

// })();

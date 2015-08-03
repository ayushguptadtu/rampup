//var express=require('express');
var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP",{
  service: "Gmail",
  auth: {
      user: "ayush1.gupta@paytm.com",
      pass: "hunkhell12"
        }
});

var mailer = function(email){
  //console.log('hi');
    //var text = "http://localhost:3000/"
  var mailOptions={
    from : "ayush1.gupta@paytm.com",
    to : email,
    subject : "New password",
    text: "text",
    html: "<a href=http://localhost:3000/changePassword>Link for password reset</a>"
  };

  console.log(mailOptions);

  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
      console.log(error);
      //res.end("error");
    } else{
      console.log("Message sent: " + response.message);
      //res.render('newPassword')
      //res.end("sent");
    }
   });
  //res.send();
};



module.exports=mailer;


/*(function(){
   mailer();
})();

*/
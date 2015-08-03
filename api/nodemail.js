//var express=require('express');
var nodemailer = require("nodemailer");


var mailer = function(req, res){

			var smtpTransport = nodemailer.createTransport("SMTP",{
			service: "Gmail",
			auth: {
					user: "ayush1.gupta@paytm.com",
					pass: "hunkhell12"
			      }
			});

			var mailOptions={
			from : "ayush1.gupta@paytm.com",
			to : req.body.email,
			subject : "subject",
			text : "text"
			}

			console.log(mailOptions);

			smtpTransport.sendMail(mailOptions, function(error, response){
			if(error){
			console.log(error);
			res.end("error");
			}else{
			//console.log("Message sent: " + response.message);
			res.end("sent");
			}
			});


};



module.exports=mailer;


/*(function(){
   mailer();
})();

*/
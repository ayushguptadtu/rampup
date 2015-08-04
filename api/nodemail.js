//var express=require('express');
var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP",{
  service: "Gmail",
  auth: {
      user: "ayush1.gupta@paytm.com",
      pass: "hunkhell1992"
        }
});
var rand,mailOptions,host,link;
var mailer ={ 
  //var rand,mailOptions,host,link;
  sendmail : function(req,res){
  console.log('hi');
    //var text = "http://localhost:3000/"
  rand=Math.floor((Math.random() * 100) + 54);
  host=req.get('host');
  link="http://"+req.get('host')+"/verify?id="+rand;
  //link="http://localhost:3000"+"/verify?id="+rand;
  var mailOptions={
    from : "ayush1.gupta@paytm.com",
    to : req.query.to,
    subject : req.query.subject,
    text : req.query.text,
    html: "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
  };

  console.log(mailOptions);

  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
      console.log(error);
      res.end("error");
    } else{
      console.log("Message sent: " + response.message);
      //res.render('newPassword')
      res.end("sent");
    }
   });
},

verify : function(req, res,next){
  console.log(req.protocol+":/"+req.get('host'));
  if((req.protocol+"://"+req.get('host'))==("http://localhost:3000")){
    console.log("Domain is matched. Information is from Authentic email");
    if(req.query.id==rand)
    {
        console.log("email is verified");
        next();
        res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
        
        //res.render(index);
    }
    else
    {
        console.log("email is not verified");
        res.end("<h1>Bad Request</h1>");
    }
  }
  else{
    res.end("<h1>Request is from unknown source");
  }
  }
  //res.send();
};



module.exports=mailer;


/*(function(){
   mailer();
})();

*/
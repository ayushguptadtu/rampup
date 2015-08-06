//var express=require('express');
var nodemailer = require("nodemailer");
var querydb = require('../model/query');
var smtpTransport = nodemailer.createTransport("SMTP",{
  service: "Gmail",
  auth: {
      user: "ayush1.gupta@paytm.com",
      pass: "hunkhell1992"
        }
});
var rand,mailOptions,host,link,userInfo;
var mailer ={ 
  //var rand,mailOptions,host,link;
  sendmail : function(req,res){
  console.log('hi');
    //var text = "http://localhost:3000/"
  //rand=Math.floor((Math.random() * 100) + 54);
  host=req.get('host');
  querydb.fetchPassword(req.query.to,function(err,passwordFetched){ //passwordFetched has password now
      //  console.log(d);
      if(err) {
        //alert('wrong email id');
        console.log("err found!");
        res.render('error',{message:'Invalid username'});
        //cb(err,null);  
      }
      else{
  //var date = new Date();
  var time = parseInt(new Date().getTime()) + 300000;
  //console.log('time===',time);
  //console.log('time===',time+300000);
  querydb.insertDate(req.query.to, time);
  userInfo=req.query.to+"&hash="+passwordFetched[0].password+"&date="+time;
  querydb.insertHash(req.query.to, userInfo);
  console.log("userInfo==",userInfo);
  link="http://"+req.get('host')+"/verify?id="+userInfo;
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
  }
});
},

verify : function(req, res,next){
  console.log(req.protocol+":/"+req.get('host'));
  var newTime = new Date().getTime();
  console.log('newTime==', newTime);
  if((req.protocol+"://"+req.get('host'))==("http://localhost:3000")){
    console.log("Domain is matched. Information is from Authentic email");

    console.log("id=====",req.query.id);
    console.log('hash===',req.query.hash);
    //console.log('date===',req.query.date);
    querydb.fetchPassword(req.query.id,function(err,passwordFetched){ //passwordFetched has password now
      //console.log("created_at",passwordFetched[0].created_at);
      var dbtime = parseInt(passwordFetched[0].created_at);
      console.log('dbtime==',dbtime);
      console.log('req.query.date==',req.query.date);
      if(err) {
        //alert('wrong email id');
        console.log("err found!");
        next(); 
      }
      else if((req.query.hash==passwordFetched[0].password) && (newTime<req.query.date))
    {
        console.log("created_at",passwordFetched[0].created_at);
        console.log("email is verified");
        next();
        res.end("<h1>Email is been Successfully verified");
        
        //res.render(index);
    }
    else
    {
        console.log("email is not verified");
        res.end("<h1>Bad Request</h1>");
    }
  });
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
var express = require('express');
//var session = require('express-session');
var router = express.Router();
var user = require('../api/user');
var nodemail = require('../api/nodemail');
var sess; 

/* GET home page. */
router.get('/', function(req, res, next) {
  sess=req.session;
//Session set when user Request our app via URL  
  if(sess.email){
/*
* This line check Session existence.
* If it existed will do some action.
*/
    res.render('home');
    }
    else{
    res.render('index');
    }
});
 

router.post('/home',function(req,res){
  //if(sess.email) res.render('home');
  if(req.session){
    if (!req.body.email || !req.body.password) 
      res.render('error',{message:'Username/password field cannot be left empty'});
    else {
    user.checkUser(req.body.email, req.body.password,function(err, name){
    if(err)
      res.render('index');
    else if(!name)
      res.render('error',{message:'Invalid username/password'});
    else {
      sess=req.session;
      sess.email=req.body.email;
        //console.log("no error");
        //router.use(session({secret: 'ssshhhhh'}));
      res.redirect('/');
    }
    });
  }  
}
});

router.post('/forgot',function(req, res, next) {
  res.render('forgot');
});

router.get('/nodemail',nodemail.sendmail);
  //nodemail(req.body.email);
//});

/*router.get('/changePassword',function(req,res){
  res.render('newPassword');
}); */
router.get('/verify',nodemail.verify,function(req, res){
  res.render('newPassword');
});

router.post('/change',function(req, res){
  user.changePassword(req.body.email,req.body.newPassword);
  res.render('index');
});

router.post('/signup',user.signup);
router.post('/save',user.save);

router.get('/logout',function(req,res){
  req.session.destroy(function(err){
    if(err){
    console.log(err);
    }
    else
    res.redirect('/');
  });

});

module.exports = router;


/*
function(req, res, next) {
  res.render('signup');
  next();*/
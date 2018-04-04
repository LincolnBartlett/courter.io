const express     = require('express'),
      router      = express.Router(),
      User        = require('../models/userSchema'),
      mongoose    = require('mongoose'),
      passport    = require('passport');


router.get(
    '/', 
    (req, res)=> {
      res.render(`./user/userPage`);

});

//CREATE
router.post(
    '/register',
    (req, res)=>{
      let newUser = new User({username: req.body.username})

      User.register(newUser, req.body.password, function(err, user){
          if(err){
              return res.render('./user/register');
          }else{
              passport.authenticate('local')(req, res, function(){
                  res.redirect('/');
              });
          }
      });
      
});


//LOGIN-LOGOUT
router.get(
    '/login',
    (req, res)=>{
      res.render('./user/login');
});
  
router.post(
    '/login', 
    passport.authenticate('local', {
      successRedirect:'/',
      failureRedirect: '/user/login'
  }), 
    (req, res)=>{}
);

  router.get('/logout', (req, res)=>{
      req.logout();
      res.redirect('/user/login');
});
  
module.exports = router;
const express = require('express'),
      router = express.Router(),
      passport = require('passport');

// GOOGLE
router.get('/google',
     passport.authenticate('google', {
        scope : ['profile', 'email'],
        })
);

router.get('/google/callback',
    passport.authenticate('google'),
    (req, res)=>{
        res.redirect('/');
    }
);




//API 
router.get('/logout',(req, res)=>{
    req.logout();
    res.redirect('/');
});




module.exports = router;
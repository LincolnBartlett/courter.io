const express = require('express'),
      router = express.Router(),
      User = require('../models/userSchema');

router.get( '/', 
    (req, res)=> {
      res.render(`./user/userPage`);
    }
);

router.get('/current_user' ,
    (req, res) =>{
     res.send(req.user);   
    }
);

router.post('/all',
      async (req, res)=>{
           const users = await User.find({});
                  res.send(users);      
      });
  
module.exports = router;
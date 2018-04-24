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
  
router.post('/one',
      async (req, res)=>{
            console.log(req.body);
            const user = await User.findById(req.body.user_id);
                        res.send(user);      
      });      
module.exports = router;
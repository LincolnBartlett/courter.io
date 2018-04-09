const express = require('express'),
      router = express.Router();
const mongoose = require('mongoose');
const {Schema} = mongoose;
const Message = require('../models/messageSchema');
const User = require('../models/userSchema')

router.post('/load',
      async (req, res)=>{
           const messages = await Message.find({}).populate('author');
                  res.send(messages);      
      });


module.exports = router;
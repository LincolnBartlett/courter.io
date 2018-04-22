const express = require('express'),
      router = express.Router(), 
      User = require('../models/userSchema'),
      Message = require('../models/messageSchema'), 
      Chat = require('../models/chatSchema'),
      IceBreaker = require('../models/iceBreakerSchema');

router.post('/load/:room',
      async (req, res) => {
            const messages = await Message.find({ chat: req.params.room }).populate('author').populate('topic');          
            res.send(messages);
      });

router.post('/chatlist',
      async (req, res) => {
            const userChats = await Chat.find({ recipients: req.body.user_id }).populate('recipients');
            res.send(userChats);
      });

router.post('/startchat',
      async (req, res) => {
            const iceBreaker = await IceBreaker.findById(req.body.icebreaker_id);
            const chat = await Chat.find({
                  $and : [
                        {recipients : {$eq: req.body.user_id}},
                        {recipients : {$eq: req.body.recipient_id}}
                  ]
            });
            
            if(chat.length === 0){
           
                  new Chat({ recipients: [req.body.user_id, req.body.recipient_id] }).save(function(err, chatdata){
                        new Message({
                              author: req.body.recipient_id,
                              chat: chatdata._id,
                              message: iceBreaker.message,
                              topic: req.body.topic_id
            
                        }).save();
                       
                        
                        
                        new Message({
                              author: req.body.user_id,
                              chat: chatdata._id,
                              message: req.body.message
                        }).save();
                        res.send('success');
                   
                  });
                  
            }else{

                  new Message({
                        author: req.body.recipient_id,
                        chat: chat[0]._id,
                        message: iceBreaker.message,
                        topic: req.body.topic_id
      
                  }).save(function(err){

                        new Message({
                              author: req.body.user_id,
                              chat: chat[0]._id,
                              message: req.body.message
            
                        }).save();

                  });

                  res.send('success');
            }
      });

module.exports = router;
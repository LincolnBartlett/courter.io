const express = require('express'),
      router = express.Router(), 
      User = require('../models/userSchema'),
      Message = require('../models/messageSchema'), 
      Chat = require('../models/chatSchema');

router.post('/load/:room',
      async (req, res) => {
            const messages = await Message.find({ chat: req.params.room }).populate('author');          
            res.send(messages);
      });

router.post('/chatlist/:id',
      async (req, res) => {
            const userChats = await Chat.find({ recipients: req.params.id }).populate('recipients');
            res.send(userChats);
      });

router.post('/startchat',
      async (req, res) => {
            const chat = await Chat.find({
                  $and : [
                        {recipients : {$eq: req.body.user_id}},
                        {recipients : {$eq: req.body.recipient_id}}
                  ]
            });
            if(chat.length > 0){
                  console.log('Chat found');
            }else{
                  console.log('Making new chat');
                  new Chat({ recipients: [req.body.user_id, req.body.recipient_id] }).save();
            }
                  

            res.send('');
      });

module.exports = router;
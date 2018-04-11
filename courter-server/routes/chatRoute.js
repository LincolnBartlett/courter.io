const express = require('express'),
      router = express.Router();
const mongoose = require('mongoose');
const {Schema} = mongoose;
const Message = require('../models/messageSchema');
const User = require('../models/userSchema');
const Chat = require('../models/chatSchema');

router.post('/load',
      async (req, res)=>{
            const messages = await Message.find({}).populate('author');
            res.send(messages);      
      });

router.post('/load/:room',
      async (req, res)=>{
            const messages = await Message.find({chat : req.params.room }).populate('author');
            res.send(messages);      
      });

router.post('/chatlist/:id',
      async (req, res)=>{
            const messages = await Chat.find({recipients : req.params.id }).populate('recipients');
            res.send(messages);      
      });

router.post('/new',
      (req, res)=>{
            new Chat({recipients:[req.body.userId]}).save(); 
            res.send('yo');
      });

router.post('/addtochat',
      (req, res)=>{
            Chat.findById(req.body.chatId,(err, chat)=>{
                  chat.recipients.push(req.body.recipient);
                  chat.save();
                  console.log(chat);
            });
            res.send('good job');
      });

module.exports = router;
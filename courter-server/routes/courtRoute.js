const express = require('express'),
      router = express.Router(), 
      User = require('../models/userSchema'),
      Message = require('../models/messageSchema'), 
      Chat = require('../models/chatSchema'),
      IceBreaker = require('../models/iceBreakerSchema'),
      Category = require('../models/categorySchema'),
      Topic = require('../models/topicSchema'),
      Item = require('../models/itemSchema');

//ICE BREAKERS
router.post('/icebreaker/new',
      (req, res) => {
         new IceBreaker({ 
             author: req.body.user_id,
             item: req.body.item_id,
             message: req.body.message
             }).save();    
         res.send('success');
      });

//CATEGORIES
router.post('/category/new',
      (req, res) => {
         new Category({ 
             title: req.body.title
            }).save();    
         res.send('success');
      });

router.post('/category/getall',
      async (req, res) => {
         const categories = await Category.find({});  
            console.log(categories);
         res.send(categories);
      }); 

//TOPICS      
router.post('/topic/get',
      async (req, res) => {
         const topics = await Topic.find({
             category : req.body.category_id
         });  
            console.log(topics);
         res.send(topics);
      });   
    
router.post('/topic/new',
      (req, res) => {
         new Topic({ 
             title: req.body.title,
             category: req.body.category_id
            }).save();    
         res.send('success');
      });


//ITEMS
router.post('/item/new',
      (req, res) => {
         new Item({ 
             topic: req.body.topic_id,
             title: req.body.title
            }).save();    
         res.send('success');
      });

module.exports = router;
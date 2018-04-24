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
             author: req.body.author_id,
             topic: req.body.topic_id,
             message: req.body.message,
             category: req.body.category_id
             }).save();    
         res.send('success');
      });


router.post('/icebreaker/getbycategory',
      async (req, res) => {
            const category = await Category.findById(req.body.category_id);
            const icebreakers = await IceBreaker.find()
                  .where('category').equals(category._id)
                  .where('author').ne(req.body.user_id)
                  .where('rejections').nin([req.body.user_id])
                  .where('replies').nin([req.body.user_id])
                  .populate('author')
                  .populate('topic');        
            res.send(icebreakers);
      });

router.post('/icebreaker/getbyuser',
      async (req, res) => {
            const icebreakers = await IceBreaker.find()
                  .where('author').equals(req.body.user_id)
                  .populate('author')
                  .populate('topic');  
            res.send(icebreakers);
      });

router.post('/icebreaker/reject',
      async (req, res) => {
            const icebreaker = await IceBreaker.findByIdAndUpdate(req.body.ice_id , {$push: {rejections: req.body.user_id}});
      });

router.post('/icebreaker/accept',
      async (req, res) => {
            const icebreaker = await IceBreaker.findByIdAndUpdate(req.body.ice_id , {$push: {replies: req.body.user_id}});
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
         res.send(categories);
      }); 

//TOPICS      
router.post('/topic/get',
      async (req, res) => {
         const topics = await Topic.find({
             category : req.body.category_id
         });  
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
router.post('/item/get',
      async (req, res) => {
         const items = await Item.find({
             category : req.body.topic_id
         });  
            console.log(items);
         res.send(items);
      }); 

router.post('/item/new',
      (req, res) => {
         new Item({ 
             topic: req.body.topic_id,
             title: req.body.title
            }).save();    
         res.send('success');
      });

module.exports = router;
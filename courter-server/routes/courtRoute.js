const express = require("express"),
  router = express.Router(),
  User = require("../models/userSchema"),
  Message = require("../models/messageSchema"),
  Chat = require("../models/chatSchema"),
  IceBreaker = require("../models/iceBreakerSchema"),
  Category = require("../models/categorySchema"),
  Topic = require("../models/topicSchema"),
  courtEvents = require("../services/courtEvents");

//ICE BREAKERS
//
router.post("/icebreaker/new", (req, res) => {
      new IceBreaker({
      author: req.body.author_id,
      topic: req.body.topic_id,
      message: req.body.message,
      category: req.body.category_id
      }).save();
      res.send("success");
});

router.post("/icebreaker/getall", async (req, res) => {
     const icebreakers = await courtEvents.getIceBreakersByAll(req);
     res.send(icebreakers);
});

router.post("/icebreaker/getbycategory", async (req, res) => {
      const icebreakers = await courtEvents.getIceBreakersByCategory(req);
      res.send(icebreakers);
});

router.post("/icebreaker/getbyuser", async (req, res) => {
      const icebreakers = await courtEvents.getIceBreakersByUser(req);
      res.send(icebreakers);
});

router.post("/icebreaker/reject", async (req, res) => {
      const icebreaker = await IceBreaker.findByIdAndUpdate(req.body.ice_id, {
      $push: { rejections: req.body.user_id }
      });
});

router.post("/icebreaker/accept", async (req, res) => {
      const icebreaker = await IceBreaker.findByIdAndUpdate(req.body.ice_id, {
      $push: { replies: req.body.user_id }
      });
});

//CATEGORIES
router.post("/category/new", (req, res) => {
      new Category({
      title: req.body.title
      }).save();
      res.send("success");
});

router.post("/category/getall", async (req, res) => {
      const categories = await Category.find({});
      res.send(categories);
});

//TOPICS
router.post("/topic/get", async (req, res) => {
      const topics = await Topic.find({
      category: req.body.category_id
      });
      res.send(topics);
});

router.post("/topic/new", (req, res) => {
      new Topic({
      title: req.body.title,
      category: req.body.category_id
      }).save();
      res.send("success");
});


module.exports = router;

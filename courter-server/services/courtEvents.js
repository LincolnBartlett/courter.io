const User = require("../models/userSchema"),
  Message = require("../models/messageSchema"),
  Chat = require("../models/chatSchema"),
  IceBreaker = require("../models/iceBreakerSchema"),
  Category = require("../models/categorySchema"),
  Topic = require("../models/topicSchema");

let courtEvents = {};

courtEvents.getIceBreakersByAll = async (req) => {
    //find user
    const user = await User.findById(req.body.user_id);
    //find other users nearby with matching preferences
    const users = await User.find()
        .where("geotag").near({
            center: { type: "Point", coordinates: user.geotag },
            maxDistance: user.settings.distance * 1609.34,
            spherical: true})
        .where("settings.preference").in(user.sex)
        .where("sex").equals(user.settings.preference)
        .where("age").lte(user.settings.agemax)
        .where("age").gte(user.settings.agemin);

    let user_idArr = [];
    users.forEach(user => {
    user_idArr.push(user._id);
    });

    const icebreakers = await IceBreaker.find()
        .where("author").in(user_idArr)
        .where("author").ne(req.body.user_id)
        .where("rejections").nin([req.body.user_id])
        .where("replies").nin([req.body.user_id])
        .populate("author")
        .populate("topic");

    return icebreakers;
}

courtEvents.getIceBreakersByCategory = async (req) => {
    //find user
    const user = await User.findById(req.body.user_id);
    //find other users nearby with matching preferences
    const users = await User.find()
        .where("geotag").near({
            center: { type: "Point", coordinates: user.geotag },
            maxDistance: user.settings.distance * 1609.34,
            spherical: true})
        .where("settings.preference").in(user.sex)
        .where("sex").equals(user.settings.preference)
        .where("age").lte(user.settings.agemax)
        .where("age").gte(user.settings.agemin);

    let user_idArr = [];
    users.forEach(user => {
    user_idArr.push(user._id);
    });
    const category = await Category.findById(req.body.category_id);
    const icebreakers = await IceBreaker.find()
        .where("author").in(user_idArr)
        .where("category").equals(category._id)
        .where("author").ne(req.body.user_id)
        .where("rejections").nin([req.body.user_id])
        .where("replies").nin([req.body.user_id])
        .populate("author")
        .populate("topic");

    return icebreakers;
}

courtEvents.getIceBreakersByUser = async (req) => {
    const icebreakers = await IceBreaker.find()
        .where("author").equals(req.body.user_id)
        .populate("author")
        .populate("topic");

    return icebreakers;
}



module.exports = courtEvents;

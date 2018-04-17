const mongoose = require('mongoose');
const {Schema} = mongoose;


var topicSchema = new Schema({
    category: {type: Schema.Types.ObjectId, ref :'categories'},
    title: String,
    timeStamp: { type : Date, default: Date.now }
});

module.exports = mongoose.model('topics', topicSchema);
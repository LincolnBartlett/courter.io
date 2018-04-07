const mongoose = require('mongoose');
const {Schema} = mongoose;


var messageSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref :'User'},
    chat: {type: Schema.Types.ObjectId, ref :'Chat'},
    message: String,
    timeStamp: { type : Date, default: Date.now }
});

module.exports = mongoose.model('messages', messageSchema);
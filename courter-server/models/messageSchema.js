const mongoose = require('mongoose');
const {Schema} = mongoose;


var messageSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref :'users'},
    chat: {type: Schema.Types.ObjectId, ref :'chats'},
    topic:{type: Schema.Types.ObjectId, ref:'topics'},
    message: String,
    timeStamp: { type : Date, default: Date.now }
});

module.exports = mongoose.model('messages', messageSchema);
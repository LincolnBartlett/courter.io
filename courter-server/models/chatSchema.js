const mongoose = require('mongoose');
const {Schema} = mongoose;

var chatSchema = new Schema({
    recipients: [{type: Schema.Types.ObjectId, ref :'User'}],
    messages: [{type: Schema.Types.ObjectId, ref :'Message'}]
});


module.exports = mongoose.model('chats', chatSchema);
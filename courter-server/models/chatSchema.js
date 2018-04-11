const mongoose = require('mongoose');
const {Schema} = mongoose;

var chatSchema = new Schema({
    recipients: [{type: Schema.Types.ObjectId, ref :'users'}]
});


module.exports = mongoose.model('chats', chatSchema);
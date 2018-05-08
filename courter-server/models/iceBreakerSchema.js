const mongoose = require('mongoose');
const {Schema} = mongoose;


var iceBreakerSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref :'users'},
    topic: {type: Schema.Types.ObjectId, ref :'topics'},
    category:{type: Schema.Types.ObjectId, ref: 'categories'},
    rejections:[{type: Schema.Types.ObjectId, ref :'users'}],
    replies:[{type: Schema.Types.ObjectId, ref :'users'}],
    message: String,
    edits: [{date: String, message: String}],
    timeStamp: { type : Date, default: Date.now }
});

module.exports = mongoose.model('iceBreakers', iceBreakerSchema);
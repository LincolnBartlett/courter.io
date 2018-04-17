const mongoose = require('mongoose');
const {Schema} = mongoose;


var iceBreakerSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref :'users'},
    item: {type: Schema.Types.ObjectId, ref :'items'},
    message: String,
    timeStamp: { type : Date, default: Date.now }
});

module.exports = mongoose.model('iceBreakers', iceBreakerSchema);
const mongoose = require('mongoose');
const {Schema} = mongoose;


var itemSchema = new Schema({
    topic: {type: Schema.Types.ObjectId, ref :'topics'},
    title: String,
    timeStamp: { type : Date, default: Date.now }
});

module.exports = mongoose.model('items', itemSchema);
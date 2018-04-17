const mongoose = require('mongoose');
const {Schema} = mongoose;


var categorySchema = new Schema({
    title: String,
    timeStamp: { type : Date, default: Date.now }
});

module.exports = mongoose.model('categories', categorySchema);
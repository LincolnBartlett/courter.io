const mongoose = require('mongoose');
const {Schema} = mongoose;
const passportLocalMongoose   = require('passport-local-mongoose');

var userSchema = new Schema({
    googleId: String,
    givenName: String,
    familyName: String
});

//userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', userSchema);
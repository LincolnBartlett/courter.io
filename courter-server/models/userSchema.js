const mongoose = require('mongoose');
const {Schema} = mongoose;

var userSchema = new Schema({
    googleId: String,
    givenName: String,
    familyName: String,
    age: Number,
    sex: String,
    location : {
        long: Number,
        lat: Number
    },
    settings: {
        agetop: Number,
        agebottom: Number,
        distance: Number
    } 
});

//userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', userSchema);
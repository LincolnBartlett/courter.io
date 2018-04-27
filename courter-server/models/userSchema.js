const mongoose = require('mongoose');
const {Schema} = mongoose;

var userSchema = new Schema({
        googleId: String,
        givenName: String,
        familyName: String,
        age: Number,
        sex: String,
        location : {
            latitude: Number,
            longitude: Number,
            neighborhood: String
        },
        settings: {
            agemax: Number,
            agemin: Number,
            distance: Number
        } 
});


module.exports = mongoose.model('users', userSchema);
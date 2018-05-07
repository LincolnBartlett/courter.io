const mongoose = require('mongoose');
const {Schema} = mongoose;

var userSchema = new Schema({
        googleId: String,
        givenName: String,
        familyName: String,
        nickname: String,
        age: Number,
        sex: String,
        location : {
            neighborhood: String
        },
        geotag:{type: [Number]},
        settings: {
            agemax: Number,
            agemin: Number,
            distance: Number,
            tutorial: Boolean,
            preference: String
        } 
});

userSchema.index({geotag: '2dsphere'});

module.exports = mongoose.model('users', userSchema);
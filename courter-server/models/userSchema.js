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
        geotag:{type: [Number]},
        settings: {
            agemax: Number,
            agemin: Number,
            distance: Number
        } 
});

userSchema.index({geotag: '2dsphere'});

module.exports = mongoose.model('users', userSchema);
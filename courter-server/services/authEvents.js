const User          = require('../models/userSchema');
const passport      = require('passport');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('../config');


const authEvents = (app) =>{
    //GOOGLE
    passport.use(new GoogleStrategy({
            clientID : config.passport.google.clientID,
            clientSecret : config.passport.google.clientSecret,
            callbackURL : '/auth/google/callback'
        }, (accessToken, refreshToken, profile, done) => {
            console.log(accessToken);
            console.log(refreshToken);
            console.log(profile);
            console.log(done);
           
        }
    ));




    //LOCAL
    app.use(require('express-session')({
        secret: config.passport.secret,
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    app.use(function(req, res, next){
        res.locals.currentUser = req.user;
        next();
    });
    
};
module.exports = authEvents;
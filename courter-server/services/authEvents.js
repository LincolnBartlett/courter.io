const mongoose = require('mongoose');
const User = mongoose.model('users');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('../config');
const cookieSession = require('cookie-session');

const authEvents = (app) =>{

    app.use(
        cookieSession({
            maxAge: 30 * 24 * 60 * 60 * 1000,
            keys: [config.coookieSessionKey]
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done)=>{
        done(null, user.id);
    });

    passport.deserializeUser((id, done)=>{
        User.findById(id)
        .then(user => {
            done(null, user);
        })
     });

    //GOOGLE
    passport.use(new GoogleStrategy({
            clientID : config.passport.google.clientID,
            clientSecret : config.passport.google.clientSecret,
            callbackURL : '/auth/google/callback'
        }, 
        async (accessToken, refreshToken, profile, done) => {
           const existingUser = await User.findOne({googleId: profile.id });

            if(existingUser){
                done(null, existingUser);   
            } else {
                const user = await new User({googleId: profile.id}).save()
                done(null, user);
            }               
              
        }
    ));




    // //LOCAL
    // app.use(require('express-session')({
    //     secret: config.passport.secret,
    //     resave: false,
    //     saveUninitialized: false
    // }));

    // app.use(passport.initialize());
    // app.use(passport.session());
    // passport.use(new LocalStrategy(User.authenticate()));
    // passport.serializeUser(User.serializeUser());
    // passport.deserializeUser(User.deserializeUser());

    app.use(function(req, res, next){
        res.locals.currentUser = req.user;
        next();
    });
    
};
module.exports = authEvents;
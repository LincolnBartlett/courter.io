const mongoose = require("mongoose"),
      User = mongoose.model("users"),
      passport = require("passport"),
      GoogleStrategy = require("passport-google-oauth20").Strategy,
      config = require("../config"),
      cookieSession = require("cookie-session");

const authEvents = app => {
  app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [config.coookieSessionKey]
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
      done(null, user);
    });
  });

  //GOOGLE
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.passport.google.clientID,
        clientSecret: config.passport.google.clientSecret,
        callbackURL: "/api/auth/google/callback"
      },
      async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          done(null, existingUser);
        } else {
          const user = await new User({
            googleId: profile.id,
            givenName: profile.name.givenName,
            familyName: profile.name.familyName
          }).save();
          done(null, user);
        }
      }
    )
  );

};

module.exports = authEvents;

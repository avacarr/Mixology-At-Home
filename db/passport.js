

const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const Users = require('../models/users');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
},
    function(accessToken, refreshToken, profile, cb) {
        Users.findOne({ 'userId.id': profile.id }, function(err, user) {
            if (err) return cb(err);
            if (user) {
                return cb(null, user);
            } else {
                const newUser = new Users({
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    userId: { id: profile.id, source:"Google"}
                });
                newUser.save(function(err) {
                    if (err) return cb(err);
                    return cb(null, newUser);
                });
            }
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    Users.findById(id, function(err, user) {
      done(err, user);
    });
  });
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("./keys");

//////Content comes from https://console.developers.google.com/apis/credentials?project=story-books-by-eb ///////
module.exports = function(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL:
          "https://immense-taiga-71853.herokuapp.com/" +
          "/auth/google/callback",
        proxy: true
      },
      (accessToken, refreshToken, profile, cb) => {
        // User.findOrCreate({ googleId: profile.id }, function(err, user) {
        //   return cb(err, user);
        // });
        console.log(accessToken);
        console.log(profile);
      }
    )
  );
};

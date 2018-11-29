const express = require("express");
const router = express.Router();
const passport = require("passport");

///Content comes from https://github.com/jaredhanson/passport-google-oauth2 ////
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect("/dashboard");
  }
);

module.exports = router;

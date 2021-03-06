const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const { googleAuthorization } = require('../controllers/authController');
require('dotenv').config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      googleAuthorization(accessToken, refreshToken, profile, done);
    }
  )
);

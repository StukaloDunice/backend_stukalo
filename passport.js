const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { Users } = require('./models');

const generateJWT = (user) => jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '24h' });

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  },
  ((accessToken, refreshToken, profile, done) => {
    Users.findOne({
      where: { email: profile.emails[0].value },
    })
      .then((user) => {
        if (!user) {
          Users.create({
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
            username: profile.displayName,
          }).then((userDb) => {
            const token = generateJWT(userDb);
            done(null, token);
          });
        }
      });
  }),
));

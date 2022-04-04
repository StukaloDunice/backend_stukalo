const express = require('express');
const passport = require('passport');
const {
  registrationUser,
  authenticationUser,
  whoIAm,
} = require('../controllers/authController');
const jwtVerification = require('../middleware/jwtVerification');

const router = express.Router();

const BAD_REQUEST = 400;

/* GET users listing. */
router.post('/register', registrationUser);
router.post('/login', authenticationUser);
router.get('/whoiam', jwtVerification, whoIAm);

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  })
);
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    session: false,
  }),
  (req, res) => {
    res.redirect(`${process.env.URL_CLIENT}accessToken/${req.user}`);
  }
);

module.exports = router;

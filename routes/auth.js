const express = require('express');
const passport = require('passport');
const { registrationUser, authenticationUser, whoIAm } = require('../controllers/authController');
const jwtVerification = require('../middleware/jwtVerification');

const router = express.Router();

const BAD_REQUEST = 400;

/* GET users listing. */
router.post('/register', registrationUser);
router.post('/login', authenticationUser);
router.get('/whoiam', jwtVerification, whoIAm);
router.get('/login/failed', (req, res) => {
  res.status(BAD_REQUEST).send({
    success: false,
    message: 'failure',
  });
});
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', {
  successRedirect: process.env.CLIENT_URL,
  failureRedirect: '/login/failed',
}));

module.exports = router;

const express = require('express');
const { registrationUser, authenticationUser, whoIAm } = require('../controllers/authController');
const jwtVerification = require('../middleware/jwtVerification');

const router = express.Router();

/* GET users listing. */
router.post('/register', registrationUser);
router.post('/login', authenticationUser);
router.get('/whoiam', jwtVerification, whoIAm);

module.exports = router;

const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

/* GET users listing. */
router.post('/register', authController.registrationUser);
router.post('/login', authController.authenticationUser);
router.get('/whoiam', authController.whoIAm);

module.exports = router;

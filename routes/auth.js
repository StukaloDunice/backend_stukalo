const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

/* GET users listing. */
router.post('/register', authController.registrationUser);

module.exports = router;

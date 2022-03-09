const express = require('express');
const newsController = require('../controllers/newsController');

const router = express.Router();

/* GET users listing. */
router.get('/', newsController.getNews);

module.exports = router;

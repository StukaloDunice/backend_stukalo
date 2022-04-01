const express = require('express');
const { getNews, addNews } = require('../controllers/newsController');
const uploadingPhotoMiddleware = require('../middleware/uploadingPhoto');
const jwtVerification = require('../middleware/jwtVerification');

const router = express.Router();

/* GET users listing. */
router.get('/', getNews);
router.post('/', jwtVerification, uploadingPhotoMiddleware.single('image'), addNews);

module.exports = router;

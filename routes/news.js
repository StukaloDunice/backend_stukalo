const express = require('express');
const newsController = require('../controllers/newsController');
const uploadingPhotoMiddleware = require('../middleware/uploadingPhoto');

const router = express.Router();

/* GET users listing. */
router.get('/', newsController.getNews);
router.post('/', uploadingPhotoMiddleware.single('image'), newsController.addNews);

module.exports = router;

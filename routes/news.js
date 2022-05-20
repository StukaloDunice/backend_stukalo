const express = require('express');
const { getNews, addNews } = require('../controllers/newsController');
const uploadingPhotoMiddleware = require('../middleware/uploadingPhoto');
const jwtVerification = require('../middleware/jwtVerification');

const router = express.Router();

/* GET users listing. */
router.get('/', getNews);
 // описание роута
 // #swagger.description = 'Get all news'
 // возвращаемый ответ
 /* #swagger.responses[200] = {
     // описание ответа
     description: 'Array of all news',
     // схема ответа - ссылка на модель
     schema: { $ref: '#/definitions/News' }
 } */
router.post('/', jwtVerification, uploadingPhotoMiddleware.single('image'), addNews);

module.exports = router;

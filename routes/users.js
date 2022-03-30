const express = require('express');
const usersController = require('../controllers/usersController');
const uploadingPhotoMiddleware = require('../middleware/uploadingPhoto');

const router = express.Router();

/* GET users listing. */
router.get('/:id', usersController.currentUser);
router.patch('/:id', uploadingPhotoMiddleware.single('avatar'), usersController.editingUser);

module.exports = router;

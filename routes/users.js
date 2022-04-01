const express = require('express');
const { currentUser, editingUser } = require('../controllers/usersController');
const uploadingPhotoMiddleware = require('../middleware/uploadingPhoto');
const jwtVerification = require('../middleware/jwtVerification');

const router = express.Router();

/* GET users listing. */
router.get('/:id', currentUser);
router.patch('/:id', jwtVerification, uploadingPhotoMiddleware.single('avatar'), editingUser);

module.exports = router;

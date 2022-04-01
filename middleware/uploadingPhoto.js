const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'public/images/');
  },
  filename(req, file, callback) {
    callback(null, `${new Date().toISOString()}-${file.originalname}`);
  },
});

module.exports = multer({ storage });

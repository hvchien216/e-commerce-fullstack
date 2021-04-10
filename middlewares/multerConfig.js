var multer = require('multer');

//multer.diskStorage() creates a storage space for storing files. 
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, './uploads');
    } else {
      cb({ message: 'This file is neither image file' }, false)
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ' ' + file.originalname);
  }
})
var upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 }
});
module.exports = upload;
const router = require("express").Router();
const upload = require('../../middlewares/multerConfig');
const { validateBody } = require("../../middlewares/validator");
const {
  uploadSingleImg,
} = require("../../controllers/uploadController");
const { auth } = require("../../middlewares/authorization");
const { validateUser } = require('../../models/User');


router.post("/single-image", upload.any(), uploadSingleImg);


module.exports = router;

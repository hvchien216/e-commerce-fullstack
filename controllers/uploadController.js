const asyncMiddleware = require("../middlewares/async");
const cloudinary = require('../utils/cloudinaryConfig');

module.exports = {
  uploadSingleImg: asyncMiddleware(async (req, res) => {

    // console.log("files=======>", req.files)
    let imgRes;
    try {
      imgRes = await cloudinary.uploads(req.files[0].path);
    } catch (error) {
      return res.json({ message: error })
    }
    if (imgRes) {
      return res.status(200).json({ img: imgRes })
    }
  }),
};

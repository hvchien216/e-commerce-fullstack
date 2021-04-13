const asyncMiddleware = require("../middlewares/async");
const cloudinary = require('../utils/cloudinaryConfig');

module.exports = {
  uploadSingleImg: asyncMiddleware(async (req, res) => {

    // console.log("files=======>", req.files)
    let imgRes;
    try {
      imgRes = await cloudinary.uploads(req.files[0].path);
    } catch (error) {
      return res.status(500).json({ error_code: "sth_went_wrong" })
    }
    if (imgRes) {
      return res.status(200).json({ img: imgRes })
    }
  }),
};

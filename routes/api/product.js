const router = require("express").Router();
const { validateBody } = require("../../middlewares/validator");
const { getProductList,
  getProductDetails,
  getNewProductList,
  getBestSellerList,
  rateProduct,
  commentProduct,
  commentListOfProduct
} = require("../../controllers/productController");
const { auth } = require("../../middlewares/authorization");
const { validateUser } = require('../../models/User');


router.get("/", getProductList);
router.get("/:slug", getProductDetails);
router.get("/new/list", getNewProductList);
router.get("/new/list", getNewProductList);
router.get("/best-seller/list", getBestSellerList);
router.put("/rate-product", auth, rateProduct);
router.put("/comment-product", auth, commentProduct);
router.get("/comment/list", commentListOfProduct);

module.exports = router;

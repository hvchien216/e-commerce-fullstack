const router = require("express").Router();
const { validateBody } = require("../../middlewares/validator");
const { getProductList,
  getProductDetails,
  getNewProductList,
  getBestSellerList
} = require("../../controllers/productController");
const { auth } = require("../../middlewares/authorization");
const { validateUser } = require('../../models/User');


router.get("/", getProductList);
router.get("/:slug", getProductDetails);
router.get("/new/list", getNewProductList);
router.get("/new/list", getNewProductList);
router.get("/best-seller/list", getBestSellerList);

module.exports = router;

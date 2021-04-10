const router = require("express").Router();
const { getOptionBrand,
} = require("../../controllers/productController");


router.get("/options/filter", getOptionBrand);


module.exports = router;

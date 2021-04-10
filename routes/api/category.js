const router = require("express").Router();
const { getOptionCategory,
} = require("../../controllers/productController");


router.get("/options/filter", getOptionCategory);


module.exports = router;

const router = require("express").Router();
const { getOptionVariant,
} = require("../../controllers/productController");


router.get("/options/filter", getOptionVariant);


module.exports = router;

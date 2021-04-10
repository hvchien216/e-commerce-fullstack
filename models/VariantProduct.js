const mongoose = require("mongoose");

const variantProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
});
const VariantProduct = new mongoose.model("variant", variantProductSchema);

exports.VariantProduct = VariantProduct;
exports.variantProductSchema = variantProductSchema;

const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
});

const Brand = new mongoose.model("brand", brandSchema);

exports.Brand = Brand;
exports.brandSchema = brandSchema;

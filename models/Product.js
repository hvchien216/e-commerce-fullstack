const mongoose = require("mongoose");
const { categorySchema } = require("./Category");
const { variantProductSchema } = require("./VariantProduct");
const Joi = require('joi');
const { brandSchema } = require("./Brand");

const productSchema = new mongoose.Schema({
  name: { type: String, unique: false },
  slug_name: String,
  description: String,
  thumb: String,
  status: { type: Number, default: 0 },
  category_id: { type: String, ref: 'category' },
  brand: brandSchema,
  code: String,
  images: [{
    url: {
      type: String,
      default: 'https://www.freeiconspng.com/uploads/no-image-icon-4.png',
    },
    primary: Boolean
  }],
  variants: [
    {
      variant: variantProductSchema,
      unit_price: {
        type: Number,
        default: 0
      },
      discount_rate: {
        type: Number,
        max: 100,
        min: 0
      },
      inStock: {
        type: Number,
        default: 0
      },
      saled: { type: Number, default: 0 },
    }
  ],
  rate: { type: Number, default: 0 },
  numOfUserRate: { type: Number, default: 0 },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comment'
    }
  ],
  createdOn: { type: Date, 'default': Date.now }
}, {
  timestamps: true
});

// const validateProduct = {
//   product: Joi.object().keys({
//     name: Joi.string()
//       .min(2)
//       .max(80)
//       .required(),
//     // categoryId: Joi.objectId().required(),
//     price: Joi.number().min(0).required(),
//     stock: Joi.number().min(0).required(),
//     discount: Joi.number().min(0).max(100),
//     image: Joi.string().required(),
//     description: Joi.string()
//       .min(10)
//       .max(255),
//     isAvailable: Joi.boolean(),

//   }),
// }
const Product = new mongoose.model("product", productSchema);

exports.Product = Product;
// exports.validateProduct = validateProduct;

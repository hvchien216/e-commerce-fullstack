const { Category } = require("../models/Category");
const { VariantProduct } = require("../models/VariantProduct");
const { Brand } = require("../models/Brand");
const asyncMiddleware = require("../middlewares/async");
const {
  transporter,
  getPasswordResetURL,
  resetPasswordTemplate,
  registerUserTemplate,
} = require('../middlewares/emailTemplate');
const usePasswordHashToMakeToken = require("../middlewares/createUserToken");
const jwt = require("jsonwebtoken");
const { Product } = require("../models/Product");
const { response } = require("express");

module.exports = {
  getProductList: asyncMiddleware(async (req, res) => {
    const {
      keyword,
      category,
      brandIds,
      from,
      to,
      sizes,
      page,
      limit
    } = req.query;
    let findByObj = {};

    if (keyword) {
      findByObj['name'] = { $regex: keyword, $options: "i" };
    }

    if (category) {
      findByObj['category_id'] = { $regex: category, $options: "i" };
    }

    if (brandIds) {
      let listBrand = brandIds.split(',');
      findByObj['brand_id'] = { $in: listBrand };
    }

    if (sizes) {
      let listSize = sizes.split(',').map(s => s.toUpperCase());
      findByObj['variants.variant.name'] = { $in: listSize };
    }

    if (!isNaN(+from) && !isNaN(+to)) {
      if (Number(from) < Number(to)) {
        findByObj['variants.unit_price'] = { $gte: Number(from), $lte: Number(to) };
      }
    } else {
      if (!isNaN(+from) && isNaN(+to)) {
        findByObj['variants.unit_price'] = { $gte: Number(from) };
      } else if (isNaN(+from) && !isNaN(+to)) {
        findByObj['variants.unit_price'] = { $gte: 0, $lte: Number(to) };
      } else {
      }
    }

    const perPage = +limit || 12;
    const numPage = page ? page >= 1 ? +page : 1 : 1;

    const productListLength = await Product.estimatedDocumentCount();
    const totalPage = Math.ceil(productListLength / perPage);

    let products = await Product.find(findByObj)
      .populate('brand_id', 'name')
      .skip((perPage * numPage) - perPage)
      .limit(perPage)
      .lean(true).exec();
    return res.status(200).json({
      products,
      totalPage,
      page: numPage
    })
  }),
  getProductDetails: asyncMiddleware(async (req, res) => {
    const {
      slug
    } = req.params;

    let product = null;
    try {
      product = await Product.findOne({ slug_name: slug })
        .populate('brand_id', 'name')
    } catch (error) {
      product = null;
      console.log(error)
    }
    return res.status(200).json({ product });

  }),
  getBestSellerList: asyncMiddleware(async (req, res) => {
    const {
      limit
    } = req.query;

    const perPage = +limit || 12;

    let products = await Product.find()
      .sort({ "variants.saled": -1 })
      .populate('brand_id', 'name')
      .limit(perPage)
      .lean(true).exec();
    return res.status(200).json({
      products,
    })
  }),
  getNewProductList: asyncMiddleware(async (req, res) => {
    const {
      limit
    } = req.query;

    const perPage = +limit || 12;

    let products = await Product.find()
      .sort({ createdAt: -1 })
      .populate('brand_id', 'name')
      .limit(perPage)
      .lean(true).exec();
    return res.status(200).json({
      products,
    })
  }),
  getOptionCategory: asyncMiddleware(async (req, res) => {
    let categogies = await Category.find()
      .lean(true).exec();
    return res.status(200).json({
      categogies,
    })
  }),
  getOptionVariant: asyncMiddleware(async (req, res) => {
    let variants = await VariantProduct.find()
      .lean(true).exec();
    return res.status(200).json({
      variants,
    })
  }),
  getOptionBrand: asyncMiddleware(async (req, res) => {
    let brands = await Brand.find()
      .lean(true).exec();
    return res.status(200).json({
      brands,
    })
  }),
};


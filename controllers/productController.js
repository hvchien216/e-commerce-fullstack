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
const _ = require('lodash');
const { User } = require("../models/User");
const { Comment } = require("../models/Comment");

module.exports = {
  getProductList: asyncMiddleware(async (req, res) => {
    const {
      keyword,
      category,
      brands,
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

    if (brands) {
      let listBrand = brands.toLocaleUpperCase().split(',');
      findByObj['brand.name'] = { $in: listBrand };
    }

    if (sizes) {
      let listSize = sizes.split(',').map(s => s.toUpperCase());
      findByObj['variants.variant.name'] = { $in: listSize };
    }

    if (!isNaN(+from) && !isNaN(+to)) {
      if (Number(from) <= Number(to)) {
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

    const productListLength = await Product.find(findByObj).countDocuments();
    const totalPage = Math.ceil(productListLength / perPage);

    let products = await Product.find(findByObj).select("-comment")
      // .populate('brand_id', 'name')
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
      product = await Product.findOne({ slug_name: slug }).select("-comment")
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

    let products = await Product.find().select("-comment")
      .sort({ "variants.saled": -1 })
      // .populate('brand_id', 'name')
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

    let products = await Product.find().select("-comment")
      .sort({ createdAt: -1 })
      // .populate('brand_id', 'name')
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
  rateProduct: asyncMiddleware(async (req, res) => {
    let { product_id, numRate } = req.body;
    let product = null;
    try {
      product = await Product.findById(product_id).select("-comment").lean().exec();
    } catch (error) {
      return res.status(400);
    }
    if (!product) {
      return res.status(200).json({ success: false })
    }
    let newNumRate = (((product.rate * product.numOfUserRate) + numRate) / (product.numOfUserRate + 1)).toFixed(1);
    try {
      let productUpdated = await Product.findOneAndUpdate({ _id: product_id }, {
        $set: {
          rate: newNumRate,
          numOfUserRate: product.numOfUserRate + 1
        }
      }, { new: true }).lean(true).exec();
      return res.status(200).json({
        success: true,
        rate: productUpdated.rate,
        numOfUserRate: productUpdated.numOfUserRate,
      })
    } catch (error) {
      return res.status(500).json({ error_code: 'sth_went_wrong' })
    }
  }),
  commentProduct: asyncMiddleware(async (req, res) => {
    const { _id } = req.user;
    const { comment_id, product_id, content } = req.body;
    let userCmt = null;
    try {
      userCmt = await User.findById(_id).lean().exec();
    } catch (error) {
      return res.status(400).json({ error_code: 'user_not_exist' })
    }
    let findByObj = {
      '_id': product_id
    };

    if (userCmt) {
      const newComment = new Comment({
        product_id: product_id,
        user_id: _id,
        content: content,
      })
      try {
        const comment = await newComment.save();
        await Product.findOneAndUpdate(findByObj, {
          $push: {
            "comments": newComment._id
          }
        })
        return res.status(200).json({
          success: true,
          comment
        })
      } catch (error) {
        return res.status(400).json({ error_code: 'bad_request' })
      }
    }

    // if (userCmt) {
    //   if (_.isNil(comment_id)) {
    //     try {
    //       const product = await Product.findOneAndUpdate(findByObj, {
    //         "$push": {
    //           "comment": {
    //             user_id: _id,
    //             content
    //           }
    //         }
    //       }, { new: true }).lean().exec();
    //       return res.status(200).json({ success: true, comment: product.comment })
    //     } catch (error) {
    //       return res.status(400).json({ error_code: 'product_not_found' })
    //     }
    //   } else {
    //     findByObj["comment._id"] = comment_id;
    //     try {
    //       const product = await Product.findOneAndUpdate(findByObj, {
    //         "$push": {
    //           "comment.$.reply": {
    //             user_id: _id,
    //             content
    //           }
    //         }
    //       }, { new: true }).lean().exec();
    //       return res.status(200).json({ success: true, comment: product.comment })
    //     } catch (error) {
    //       return res.status(400).json({ error_code: 'product_not_found' })
    //     }
    //   }
    // }
    // return res.status(400).json({ error_code: 'user_not_found' })
  }),
  commentListOfProduct: asyncMiddleware(async (req, res) => {
    const {
      product_id,
      comment_id,
      page,
      limit
    } = req.query;
    const perPage = +limit || 12;
    const numPage = page ? page >= 1 ? +page : 1 : 1;

    const commentOfProductLength = await Comment.find({ product_id: product_id }).countDocuments();
    const totalPage = Math.ceil(commentOfProductLength / perPage);

    let comments = await Comment.find({ product_id: product_id })
      .sort({ createdOn: -1 })
      .populate({ path: "user_id", select: "info -_id" })
      .select('-product_id')
      .skip((perPage * numPage) - perPage)
      .limit(perPage)
      .lean(true).exec();
    return res.status(200).json({
      comments,
      totalPage,
      page: numPage
    })
  }),
};

const mongoose = require('mongoose');
// const Joi = require("joi");

const categorySchema = new mongoose.Schema({
    _id: { type: String, required: true },
}, {
    timestamps: true
});

const Category = new mongoose.model('category', categorySchema);
// const validateCategory = {
//     category: Joi.object().keys({
//         // _id: Joi.objectId(),
//         name: Joi.string()
//             .min(3)
//             .max(50)
//             .required(),
//         description: Joi.string()
//             .min(10)
//             .max(255),
//         isAvailable: Joi.boolean()
//     })
// }
// exports.validateCategory = validateCategory;
// exports.categorySchema = categorySchema;
exports.Category = Category;
const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'user' },
  receiver_name: String,
  note: String,
  address: String,
  phone: String,
  totalAmount: Number,
  paymentMethod: String,
  status: {
    type: String, //WAITING, COMFIRMED, SHIPPING, SUCCESS, RETURNS
    default: "WAITING",
  },
  detais: [
    {
      product_id: { type: mongoose.Schema.ObjectId, ref: 'product' },
      price: Number,
      quantity: Number,
      variant: String,
      total: Number
    }
  ],
}, {
  timestamps: true
});

const Order = new mongoose.model("order", orderSchema);
exports.Order = Order;
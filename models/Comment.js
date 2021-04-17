const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.ObjectId, ref: 'product' },
  user_id: { type: mongoose.Schema.ObjectId, ref: 'user' },
  content: String,
  reply: [
    {
      user_id: { type: mongoose.Schema.ObjectId, ref: 'user' },
      content: String,
      createdOn: { type: Date, 'default': Date.now }
    }
  ],
  createdOn: { type: Date, 'default': Date.now }
}, {
  timestamps: true
});

const Comment = new mongoose.model("comment", commentSchema);

exports.Comment = Comment;

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    unique: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 1024,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  info: {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      // required: true,
      minlength: 5,
      maxlength: 50
    },
    avatar: {
      type: String,
    },
    addresses: [{
      address: {
        type: String,
        default: ''
      },
      isDefault: Boolean
    }
    ]
  },
}, {
  timestamps: true
});

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(this.password, salt);
    this.password = passwordHash;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (err) {
    throw new Error(err);
  }
};

userSchema.methods.generateAuthToken = function () {
  try {
    return jwt.sign(
      {
        _id: this._id,
        isAdmin: this.isAdmin,
        // exp: new Date().setDate(new Date().getDate() + 1)
      },
      process.env.JWT_SECRET,
      { expiresIn: 0.5 * 60 * 1000 }
    );
  } catch (err) {
    throw new Error(err);
  }
};

const User = new mongoose.model("user", userSchema);
const validateUser = {
  register: Joi.object().keys({
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .max(255)
      .required(),
    name: Joi.string().required(),
  }),
  login: Joi.object().keys({
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .max(255)
      .required()
  })
}
exports.validateUser = validateUser;
exports.User = User;
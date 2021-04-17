const { User } = require("../models/User");
const bcrypt = require("bcryptjs");
const asyncMiddleware = require("../middlewares/async");
const {
  transporter,
  getPasswordResetURL,
  resetPasswordTemplate,
  registerUserTemplate,
} = require('../middlewares/emailTemplate');
const usePasswordHashToMakeToken = require("../middlewares/createUserToken");
const jwt = require("jsonwebtoken");
const { Order } = require("../models/Order");

module.exports = {
  register: asyncMiddleware(async (req, res) => {
    const { email, password, name } = req.body;

    const foundUser = await User.findOne({ email });

    if (foundUser) {
      return res.status(403).json({ error_code: 'user_had_existed' });
    }

    const newUser = new User({
      email,
      password,
      info: {
        name
      }
    });


    const user = await newUser.save();
    const sendEmail = () => {
      transporter.sendMail(registerUserTemplate(user), (err, info) => {
        if (err) {
          res.status(500).send({ error_code: 'sendmail_fail' });
        } else {
          // console.log(`** Email sent **`, info);
        }
      });
    };
    sendEmail();
    const token = `${user.generateAuthToken()}`;

    res
      .header("authorization", token)
      .status(200)
      .json({ token });
  }),
  login: asyncMiddleware(async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user)
      return res.status(403).json({ error_code: 'user_is_not_exist' });

    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword)
      return res.status(403).json({ error_code: 'user_account_wrong_password' });

    const token = `${user.generateAuthToken()}`;
    res
      .header("authorization", token)
      .status(200)
      .json({ token });
  }),
  getProfile: asyncMiddleware(async (req, res) => {
    const { _id } = req.user;

    let userProfile = await User.findById(_id).select('email info.phone info.name info.avatar info.addresses');
    if (!userProfile)
      return res.status(403).json({ error_code: 'user_account_not_existed' });

    res.status(200).json({ profile: userProfile });
  }),
  updateProfile: asyncMiddleware(async (req, res) => {
    const { _id } = req.user;
    let updateUserProfile = await User.findByIdAndUpdate(_id, { info: req.body }).lean(true).exec();
    if (!updateUserProfile)
      return res.status(403).json({ error_code: 'cant_update_profile' });

    res.status(200).json({ success: true, updateUserProfile });
  }),
  changePwd: asyncMiddleware(async (req, res) => {
    const { _id } = req.user;
    const { prevPassword, newPassword } = req.body;
    let user = await User.findById(_id);

    const isValidPassword = await user.isValidPassword(prevPassword);

    if (!isValidPassword)
      return res.status(403).json({ error_code: `password_invalid` });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);
    try {
      await User.findByIdAndUpdate(_id, { password: passwordHash });
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error_code: "sth_went_wrong" });
    }
  }),
  forgotPassword: asyncMiddleware(async (req, res) => {
    const email = req.body.email.toLowerCase();
    if (!email) {
      return res.status(403).send({ error_code: 'email_is_required' });
    }
    let user;
    try {
      user = await User.findOne({ email });
    } catch (err) {
      res.status(404).send({ error_code: 'user_is_not_exist' });
    }
    if (!user) {
      res.status(404).send({ error_code: 'user_is_not_exist' });
    }
    const token = usePasswordHashToMakeToken(user);
    const url = getPasswordResetURL(user, token);
    const emailTemplate = resetPasswordTemplate(user, url);
    const sendEmail = () => {
      transporter.sendMail(emailTemplate, (err, info) => {
        if (err) {
          res.status(500).send({ error_code: 'sendmail_fail' });
        } else {
          res.send({ success: true });
        }
      });
    };

    sendEmail();
  }),
  userResetPwd: asyncMiddleware(async (req, res) => {
    const { userId, token } = req.params;
    const { password } = req.body;
    // let content = {
    //   title: 'Security',
    //   body: `Reset Password Successfully.`,
    // };
    // highlight-start
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(403).json({ error_code: 'user_account_not_existed' });
    }
    const secret = user.password + '-' + user.createdAt;
    const payload = jwt.decode(token, secret);
    jwt.verify(token, secret, async (err, payload) => {
      if (err) {
        // console.log("err======>", err)
        return res.status(401).json({
          error_code: 'token_expried'
        })
      }
      if (payload._id === userId) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        try {
          const updateUser = await User.findOneAndUpdate(
            { _id: userId },
            { password: hashedPassword },
          );
          // pushNotification(updateUser.pushTokens, content, ''),
          res.status(202).send({ success: true });
        } catch (err) {
          res.status(500).send({ err });
        }
      } else {
        return res.status(401).json({ error_code: 'token_invalid' })
      }
    });
  }),
  getMyOrderList: asyncMiddleware(async (req, res) => {
    const { _id } = req.user;
    const {
      status = '',
      page,
      limit
    } = req.query;
    const perPage = +limit || 3;
    const numPage = page ? page >= 1 ? +page : 1 : 1;

    const myOrderListLength = await Order.find({ user: _id, status: { $regex: status, $options: "i" } }).countDocuments();
    const totalPage = Math.ceil(myOrderListLength / perPage);
    let myOrders = await Order.find({ user: _id, status: { $regex: status, $options: "i" } })
      .populate('detais.product_id')
      .skip((perPage * numPage) - perPage)
      .limit(perPage)
      .lean(true).exec();
    return res.status(200).json({
      orders: myOrders,
      totalPage,
      page: numPage
    })
  }),
  getMyOrderDetail: asyncMiddleware(async (req, res) => {
    const { _id } = req.user;
    const { orderId } = req.params;

    let order = null;

    try {
      order = await Order.findOne({ _id: orderId }).populate('detais.product_id').exec()
    } catch (error) {
      order = null;
      console.log(error)
      return res.status(403).json({ error_code: 'order_not_found' });
    }
    return res.status(200).json({ order });
  }),
  secret: async (req, res) => {
    res.status(200).json({ message: "secret page!!" });
  }
};

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
      return res.status(400).json(`"exist" User already registered.`);
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
          res.status(500).send({ err: 'Error sending email' });
        } else {
          console.log(`** Email sent **`, info);
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
      return res.status(400).json(`"invalid" email or password.`);

    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword)
      return res.status(400).json(`"invalid" password.`);

    const token = `${user.generateAuthToken()}`;
    res
      .header("authorization", token)
      .status(200)
      .json({ token });
  }),
  getProfile: asyncMiddleware(async (req, res) => {
    const { _id } = req.user;

    let userProfile = await User.findById(_id).select('email info.phone info.name info.avatar info.address');
    if (!userProfile)
      return res.status(400).json(`User not found.`);

    res.status(200).json({ profile: userProfile });
  }),
  updateProfile: asyncMiddleware(async (req, res) => {
    const { _id } = req.user;
    let updateUserProfile = await User.findByIdAndUpdate(_id, { profile: req.body });
    if (!updateUserProfile)
      return res.status(400).json(` Can not update profile.`);

    res.status(200).json({ message: "Successfully!" });
  }),
  changePwd: asyncMiddleware(async (req, res) => {
    const { _id } = req.user;
    const { prevPassword, newPassword } = req.body;
    let user = await User.findById(_id);

    const isValidPassword = await user.isValidPassword(prevPassword);

    if (!isValidPassword)
      return res.status(400).json({ message: `"invalid" current password.` });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);
    const setNewPwd = await User.findByIdAndUpdate(_id, { password: passwordHash });

    res.status(200).json({ message: "Successfully!" });
  }),
  forgotPassword: asyncMiddleware(async (req, res) => {
    const email = req.body.email.toLowerCase();
    if (!email) {
      return res.status(400).send({ err: 'Email is wrong' });
    }
    let user;
    try {
      user = await User.findOne({ email });
    } catch (err) {
      res.status(404).send({ err: 'Email is not exist' });
    }
    if (!user) {
      res.status(404).send({ err: 'Email is not exist' });
    }
    const token = usePasswordHashToMakeToken(user);
    const url = getPasswordResetURL(user, token);
    const emailTemplate = resetPasswordTemplate(user, url);
    const sendEmail = () => {
      transporter.sendMail(emailTemplate, (err, info) => {
        if (err) {
          res.status(500).send({ err: 'Error sending email' });
        } else {
          console.log(`** Email sent **`, info);
          res.send({ res: 'Sent reset Email' });
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
      res.status(404).send({ err: 'Invalid user' });
    }
    const secret = user.password + '-' + user.createdAt;
    const payload = jwt.decode(token, secret);
    jwt.verify(token, secret, async (err, payload) => {
      if (err) {
        // console.log("err======>", err)
        return res.status(401).json({
          error: 'Incorrect token or it is expried.'
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
          res.status(202).send('Password is changed');
        } catch (err) {
          res.status(500).send({ err });
        }
      } else {
        res.status(500).send({ err: 'Token is invalid' });
      }
      // console.log("decodeData======>", Date.now(), decodeData)
      // console.log("token expried===>", Date.now() >= decodeData.exp * 1000)
    });
  }),
  getMyOrderList: asyncMiddleware(async (req, res) => {
    const { _id } = req.user;
    const {
      page,
      limit
    } = req.query;
    const perPage = +limit || 12;
    const numPage = page ? page >= 1 ? +page : 1 : 1;

    const myOrderListLength = await Order.find({ user: _id }).estimatedDocumentCount();
    const totalPage = Math.ceil(myOrderListLength / perPage);
    let myOrders = await Order.find({ user: _id })
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
    }
    return res.status(200).json({ order });
  }),
  secret: async (req, res) => {
    res.status(200).json({ message: "secret page!!" });
  }
};

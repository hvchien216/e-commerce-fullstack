const router = require("express").Router();
const { validateBody } = require("../../middlewares/validator");
const { register,
  login,
  getProfile,
  updateProfile,
  changePwd,
  forgotPassword,
  userResetPwd,
  getMyOrderList,
  getMyOrderDetail } = require("../../controllers/authController");
const { auth } = require("../../middlewares/authorization");
const { validateUser } = require('../../models/User');


router.post("/register", validateBody(validateUser.register), register);
router.post("/login", validateBody(validateUser.login), login);
router.get("/profile", auth, getProfile);
router.put("/profile", auth, updateProfile);
router.put("/change-pwd", auth, changePwd);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:userId/:token", userResetPwd);

router.get("/my-order", auth, getMyOrderList);
router.get("/my-order/:orderId", auth, getMyOrderDetail);


module.exports = router;

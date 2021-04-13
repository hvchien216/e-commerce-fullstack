const router = require("express").Router();
const { validateBody } = require("../../middlewares/validator");
const { createPayment,
  excutePayment,
  paymentByCOD,
  paymentByCreditCard
} = require("../../controllers/paymentController");
const { auth } = require("../../middlewares/authorization");
const { validateUser } = require('../../models/User');


router.post("/create-payment", auth, createPayment);
router.post("/execute-payment", auth, excutePayment);
router.post("/payment-by-cod", auth, paymentByCOD);
router.post("/payment-by-credit-card", auth, paymentByCreditCard);

module.exports = router;

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
const { Product } = require("../models/Product");
const { response } = require("express");
const request = require('request');
const async = require('async');
const { Order } = require("../models/Order");
const _ = require('lodash');
const stripe = require("stripe")(process.env.STRIPE_SECRET_TOKEN);
module.exports = {
  paymentByCOD: asyncMiddleware(async (req, res) => {
    const { _id } = req.user;
    const { info_receiver, cart_lines, note, paymentMethod } = req.body;

    let details = (cart) => {
      let restoreDetails = [];
      let total = 0;

      cart.forEach(detail => {
        total += detail.price * detail.quantity;
        restoreDetails.push({
          product_id: detail.product_id,
          price: detail.price,
          quantity: detail.quantity,
          variant: detail.variant,
          total: detail.total,
        });
      });

      return {
        detailsArr: restoreDetails,
        billTotal: total
      };
    };
    let data = details(cart_lines);
    // email
    // name
    // phoneReceiver
    // address
    let order = new Order({
      user: _id,
      receiver_name: info_receiver.name,
      note: note,
      address: info_receiver.address,
      phone: info_receiver.phone,
      paymentMethod: paymentMethod,
      totalAmount: data.billTotal,
      // status: 'WAITING',
      detais: data.detailsArr
    });

    order.save(function (err, results) {
      if (err) {
        return res.status(500).send({
          error_code: 'cant_create_order'
        });
      }
      async.eachSeries(data.detailsArr, (item, done) => {
        let qty = parseInt(item.quantity);
        new Promise((resolve, reject) => {
          Product.findById(item.product_id, (err, prd) => {
            if (err) {
              reject();
            } else {

              resolve({
                vIndex: _.findIndex(prd.variants, ['variant.name', item.variant]),
              });
            }
          })
        }).then((path) => {
          let vpath = `variants.${path.vIndex}.inStock`;
          let spath = `variants.${path.vIndex}.saled`;

          Product.findOneAndUpdate(
            { _id: item.product_id, 'variants.variant.name': item.variant },
            {
              $inc: {
                [spath]: +qty,
                [vpath]: -qty,
              },
            },
            (err, product) => {
              if (err) {
                throw new Error;
              }
              done();
            }
          );
        });
      }, (err) => {
        // eventEmitter.emit('sendConfirmOrderMail', {
        //   items: data.detailsArr,
        //   user: req.user,
        //   total: data.billTotal,
        //   billId: results._id
        // });
        // req.app.io.emit('notifiNewBills', {
        //   content: 'Có đơn đặt hàng mới !',
        // });
        // req.session.cart = undefined;
        return res.json({
          success: true,
          details: data.detailsArr,
          total: data.billTotal,
          user: req.user
        });
      });
    });
  }),
  paymentByCreditCard: asyncMiddleware(async (req, res) => {
    const { _id } = req.user;
    const { token_payment, info_receiver, cart_lines, note, paymentMethod } = req.body;
    const orders = cart_lines.map((item) => {
      return `productID: ${item.product_id} - ${item.name}, ${item.variant} quantity:${item.quantity}`;
    });

    let details = (cart) => {
      let restoreDetails = [];
      let total = 0;

      cart.forEach(detail => {
        total += detail.price * detail.quantity;
        restoreDetails.push({
          product_id: detail.product_id,
          price: detail.price,
          quantity: detail.quantity,
          variant: detail.variant,
          total: detail.total,
        });
      });

      return {
        detailsArr: restoreDetails,
        billTotal: total
      };
    };
    let data = details(cart_lines);
    try {
      const payment = await stripe.paymentIntents.create({
        amount: data.billTotal,
        currency: "VND",
        description: `Order Items: ${orders}`,
        payment_method: token_payment,
        confirm: true,
      });

    } catch (error) {
      return res.status(500).send({
        error_code: 'cant_create_order'
      });
    }
    // email
    // name
    // phoneReceiver
    // address
    let order = new Order({
      user: _id,
      receiver_name: info_receiver.name,
      note: note,
      address: info_receiver.address,
      phone: info_receiver.phone,
      paymentMethod: paymentMethod,
      totalAmount: data.billTotal,
      // status: 'WAITING',
      detais: data.detailsArr
    });

    order.save(function (err, results) {
      if (err) {
        return res.status(500).send({
          error_code: 'cant_create_order'
        });
      }
      async.eachSeries(data.detailsArr, (item, done) => {
        let qty = parseInt(item.quantity);
        new Promise((resolve, reject) => {
          Product.findById(item.product_id, (err, prd) => {
            if (err) {
              reject();
            } else {

              resolve({
                vIndex: _.findIndex(prd.variants, ['variant.name', item.variant]),
              });
            }
          })
        }).then((path) => {
          let vpath = `variants.${path.vIndex}.inStock`;
          let spath = `variants.${path.vIndex}.saled`;

          Product.findOneAndUpdate(
            { _id: item.product_id, 'variants.variant.name': item.variant },
            {
              $inc: {
                [spath]: +qty,
                [vpath]: -qty,
              },
            },
            (err, product) => {
              if (err) {
                throw new Error;
              }
              done();
            }
          );
        });
      }, (err) => {
        // eventEmitter.emit('sendConfirmOrderMail', {
        //   items: data.detailsArr,
        //   user: req.user,
        //   total: data.billTotal,
        //   billId: results._id
        // });
        // req.app.io.emit('notifiNewBills', {
        //   content: 'Có đơn đặt hàng mới !',
        // });
        // req.session.cart = undefined;
        return res.json({
          success: true,
          details: data.detailsArr,
          total: data.billTotal,
          user: req.user
        });
      });
    });
  }),
  createPayment: asyncMiddleware(async (req, res) => {
    const { order } = req.body;
    // const cart = items.cart.map(item => {
    //   return {
    //     name: item.product.name,
    //     price: item.product.discount && item.product.discount > 0
    //       ? Number(
    //         item.product.price -
    //         item.product.discount * item.product.price * 0.01
    //       ).toFixed(2).toString() : item.product.price.toString(),
    //     currency: "USD",
    //     quantity: item.quantity
    //   }
    // })

    request.post(process.env.PAYPAL_API + '/v1/payments/payment',
      {
        auth:
        {
          user: process.env.PAYPAL_CLIENT_ID,
          pass: process.env.PAYPAL_CLIENT_SECRET
        },
        body:
        {
          intent: 'sale',
          payer:
          {
            payment_method: 'paypal'
          },
          transactions: [
            {
              // item_list: {
              //   items: cart
              // },
              amount:
              {
                // total: items.totalAmount.toString(),
                total: '0.5',
                currency: 'USD'
              }
            }],
          redirect_urls:
          {
            return_url: process.env.RETURN_URL,
            cancel_url: process.env.CANCEL_URL
          }
        },
        json: true
      }, function (err, response) {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
        // 3. Return the payment ID to the client

        res.json(
          {
            id: response.body.id
          });
      });
  }),
  excutePayment: asyncMiddleware(async (req, res) => {
    return res.json({ msg: "success" })
    // console.log(req.body);
    // var paymentID = req.body.paymentID;
    // var payerID = req.body.payerID;
    // // 3. Call /v1/payments/payment/PAY-XXX/execute to finalize the payment.
    // request.post(PAYPAL_API + '/v1/payments/payment/' + paymentID +
    // '/execute',
    // {
    //     auth:
    //     {
    //         user: CLIENT,
    //         pass: SECRET
    //     },
    //     body:
    //     {
    //     payer_id: payerID,
    //     transactions: [
    //     {
    //         amount:
    //         {
    //         total: '10.99',
    //         currency: 'USD'
    //         }
    //     }]
    //     },
    //     json: true
    // },
    // function(err, response)
    // {
    //     if (err)
    //     {
    //         console.error(err);
    //         return res.sendStatus(500);
    //     }
    //     // 4. Return a success response to the client
    //     res.json(
    //     {
    //     status: 'success'
    //     });
    // });

  }),
};

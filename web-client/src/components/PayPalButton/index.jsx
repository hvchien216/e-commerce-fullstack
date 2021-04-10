import React, { FC, useEffect, useState } from "react";
import scriptLoader from "react-async-script-loader";

const PayPalButton = (props) => {
  const { onSuccess, onCancel, onError } = props;
  const [showBtn, setShowBtn] = useState(false);
  useEffect(() => {
    setShowBtn(true);
    paypal.Button.render(
      {
        env: "sandbox", // Or 'production'
        // Set up the payment:
        // 1. Add a payment callback
        payment: function (data, actions) {
          // 2. Make a request to your server
          return actions.request
            .post(
              `${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-payment`
            )
            .then(function (res) {
              // 3. Return res.id from the response
              return res.id;
            });
        },
        // Execute the payment:
        // 1. Add an onAuthorize callback
        onAuthorize: function (data, actions) {
          // 2. Make a request to your server
          return actions.request
            .post(
              `${process.env.NEXT_PUBLIC_API_URL}/api/payment/execute-payment`,
              {
                paymentID: data.paymentID,
                payerID: data.payerID,
              }
            )
            .then(function (res) {
              // 3. Show the buyer a confirmation message.
              alert("payment got successful");
            });
        },
      },
      "#paypal-button"
    );
  }, []);

  return <div>{showBtn && <div id="paypal-button"></div>}</div>;
};

export default PayPalButton;

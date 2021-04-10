import React, { FC, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
} from "@material-ui/core";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  CardCvcElement,
  CardElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
  AuBankAccountElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "@components/InputField";
import StripeInput from "@components/StripeInput";
import orderApi from "@redux/authUser/api";
import MyButton from "@components/Button";
import { removeAllItemCart } from "@redux/cart/actions";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import CreditCard from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

interface IFormTypeCreditCard {
  name: string;
  cvc: string;
  ccexp: string;
  ccnumber: string;
}

const cardsLogo = [
  "amazon",
  "ebay",
  "jcb",
  "maestro",
  "mastercard",
  "paypal",
  "visa",
  "visaelectron",
];

const schemaCreditCard = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên"),
  // cvc: yup.number().required("Vui lòng nhập CVC"),
  // ccexp: yup.date().required("Vui lòng nhập ngày hết hạn"),
  ccnumber: yup.number().required("Vui lòng nhập số tài khoản"),
});
const FormCheckOutCreditCard: FC<any> = (props: any) => {
  const { onClose, open, values, cart } = props;
  const [stripePromise, setStripePromise] = useState<any>(null);
  const stripe: any = useStripe();
  const elements: any = useElements();
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { isSubmitting, errors, touchedFields, isValid },
    setValue,
    getValues,
    ...rest
  } = useForm<IFormTypeCreditCard>({
    defaultValues: {
      name: "",
      cvc: "",
      ccexp: "",
      ccnumber: "",
    },
    // resolver: yupResolver(schemaCreditCard),
  });

  const onSubmit: SubmitHandler<IFormTypeCreditCard> = async (data) => {
    const formData = values();
    const body: any = {
      info_receiver: {
        name: formData?.name,
        phone: formData?.phone,
        address: formData?.address,
      },
      cart_lines: cart,
      note: formData?.note,
      paymentMethod: formData?.paymentMethod,
    };

    const capture = async () => {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardNumberElement),
      });
      if (!error) {
        try {
          const { id } = paymentMethod;
          body["token_payment"] = id;
          const response: any = await orderApi.paymentByCreditCard(body);
          if (response.success) {
            console.log("CheckoutForm.js 25 | payment successful!", props);

            await dispatch(removeAllItemCart());
            props.onClose();
            router.push("/");
          }
        } catch (error) {
          console.log("CheckoutForm.js 28 | ", error);
        }
      } else {
        console.log(error.message);
      }
    };
    await capture();
  };

  useEffect(() => {
    const stripe = loadStripe(
      process.env.NEXT_PUBLIC_PUBLIC_TRIPE_KEY as string
    );
    setStripePromise(stripe);
  }, []);
  return (
    <Dialog
      fullWidth={true}
      open={open}
      maxWidth="md"
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="alert-dialog-title">
          Thanh toán qua thẻ tín dụng
        </DialogTitle>
        <DialogContent>
          <Grid container item xs={12}>
            <Grid item xs={12} sm={3}></Grid>
            <Grid container item xs={12} sm={9} justify="space-between">
              {cardsLogo.map((e) => (
                <img
                  key={e}
                  src={`./cards/${e}.png`}
                  alt={e}
                  width="60px"
                  style={{ padding: "0 5px" }}
                />
              ))}
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item md={12}>
              <InputField
                control={control}
                name="ccnumber"
                value=""
                errors={errors}
                touched={touchedFields}
                label="Số tài khoản *"
                InputProps={{
                  inputComponent: StripeInput,
                  inputProps: {
                    component: CardNumberElement,
                  },
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <InputField
                control={control}
                name="ccexp"
                value=""
                errors={errors}
                touched={touchedFields}
                label="Ngày hết hạn *"
                InputProps={{
                  inputProps: {
                    component: CardExpiryElement,
                  },
                  inputComponent: StripeInput,
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <InputField
                control={control}
                name="cvc"
                value=""
                errors={errors}
                touched={touchedFields}
                label="CVC *"
                InputProps={{
                  inputProps: {
                    component: CardCvcElement,
                  },
                  inputComponent: StripeInput,
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <MyButton onClick={onClose} color="red">
            Hủy
          </MyButton>
          <MyButton
            color="blue"
            type="submit"
            disabled={isSubmitting}
            autoFocus
          >
            {isSubmitting ? (
              <CircularProgress size={23} />
            ) : (
              "Xác nhận thanh toán"
            )}
          </MyButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FormCheckOutCreditCard;

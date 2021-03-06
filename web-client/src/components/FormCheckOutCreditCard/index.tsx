import MyButton from "@components/Button";
import InputField from "@components/InputField";
import StripeInput from "@components/StripeInput";
import { showError } from "@config/ServiceErrors";
import {
  CircularProgress,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import orderApi from "@redux/authUser/api";
import { removeAllItemCart } from "@redux/cart/actions";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { alertNotification } from "@utils/index";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import "react-credit-cards/es/styles-compiled.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";

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
const useStyles = makeStyles((theme: Theme) => ({
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontWeight: 500,
    fontSize: theme.typography.h4.fontSize,
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.typography.body1.fontSize,
    },
  },
  contentModal: {
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "200px",
    },
  },
}));
const FormCheckOutCreditCard: FC<any> = (props: any) => {
  const classes = useStyles();
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
    formState: { isSubmitting, errors, touchedFields },
    setValue,
    getValues,
  } = useForm<IFormTypeCreditCard>({
    defaultValues: {
      name: "",
      cvc: "",
      ccexp: "",
      ccnumber: "",
    },
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
            await dispatch(removeAllItemCart());
            props.onClose();
            router.push("/");
            alertNotification("?????t h??ng th??nh c??ng");
          }
        } catch (error) {
          showError(error);
        }
      } else {
        if (error?.code === "incomplete_number") {
          showError("Vui l??ng nh???p s??? t??i kho???n");
        }
        if (error?.code === "incomplete_expiry") {
          showError("Vui l??ng nh???p ng??y h???t h???n");
        }
        if (error?.code === "incomplete_cvc") {
          showError("Vui l??ng nh???p s??? CVC");
        }
        if (error?.code === "invalid_number") {
          showError("S??? t??i kho???n kh??ng h???p l???");
        }
        if (error?.code === "invalid_expiry_year_past") {
          showError("Th??? c???a b???n ???? h???t h???n s??? d???ng");
        }
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
      className={classes.contentModal}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="alert-dialog-title">
          <Typography color="primary" className={classes.title}>
            Thanh to??n qua th??? t??n d???ng
          </Typography>
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
            <Grid item xs={12} md={12}>
              <InputField
                control={control}
                name="ccnumber"
                value=""
                errors={errors}
                touched={touchedFields}
                label="S??? t??i kho???n *"
                InputProps={{
                  inputComponent: StripeInput,
                  inputProps: {
                    component: CardNumberElement,
                  },
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputField
                control={control}
                name="ccexp"
                value=""
                errors={errors}
                touched={touchedFields}
                label="Ng??y h???t h???n *"
                InputProps={{
                  inputProps: {
                    component: CardExpiryElement,
                  },
                  inputComponent: StripeInput,
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
            H???y
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
              "X??c nh???n thanh to??n"
            )}
          </MyButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FormCheckOutCreditCard;

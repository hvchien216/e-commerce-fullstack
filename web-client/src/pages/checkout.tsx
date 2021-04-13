import MyButton from "@components/Button";
import FormCheckOutCreditCard from "@components/FormCheckOutCreditCard";
import InputField from "@components/InputField";
import Layout from "@components/Layout";
import Link from "@components/Link";
import RadioBoxGroupField, {
  IOptionRadioButton,
} from "@components/RadioBoxGroupField";
import { showError } from "@config/ServiceErrors";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import orderApi from "@redux/authUser/api";
import { removeAllItemCart } from "@redux/cart/actions";
import { CartItem } from "@redux/cart/types";
import { AppState } from "@redux/store";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { alertNotification, formatCurrency } from "@utils/index";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
const PAYMENT_METHOD_OPTIONS: IOptionRadioButton[] = [
  {
    value: "COD",
    disable: false,
    label: "Thanh toán khi nhận hàng (COD)",
  },
  // {
  //   value: "PAYPAL",
  //   disable: false,
  //   label: "Thanh toán qua PayPal",
  // },
  {
    value: "STRIPE",
    disable: false,
    label: "Thanh toán qua thẻ tín dụng",
  },
];

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontWeight: 500,
  },
  productItem: {
    // color: theme.palette.secondary.contrastText,
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0, 2),
      height: "auto",
    },
    [theme.breakpoints.up("md")]: {
      backgroundColor: theme.palette.primary.main,
      height: 378,
    },
  },
  submitBox: {
    marginTop: theme.spacing(2),
  },
}));
const schemaCheckout = yup.object().shape({
  paymentMethod: yup.string().required("Vui lòng chọn hình thức thanh toán"),
  phone: yup.string().required("Vui lòng nhập số điện thoại người nhận"),
  address: yup.string().required("Vui lòng nhập địa chỉ người nhận"),
});

interface IFormCheckout {
  email: string;
  name: string;
  phone: string;
  address: string;
  paymentMethod: string;
  note: string;
}

const Checkout = ({ bestSellerList, newProductList, navbarList }: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector((state: AppState) => state.cart.myCart);
  const [open, setOpen] = useState<boolean>(false);
  const [stripePromise, setStripePromise] = useState<any>(null);
  useEffect(() => {
    const stripe = loadStripe(
      process.env.NEXT_PUBLIC_PUBLIC_TRIPE_KEY as string
    );
    setStripePromise(stripe);
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const totalQuantityProduct = cart
    ? cart.reduce((total, item) => {
        return (total = total + item.quantity);
      }, 0)
    : null;

  const totalPrice = cart
    ? cart.reduce((total, item) => {
        return (total = total + item.price * item.quantity);
      }, 0)
    : null;
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { isSubmitting, errors, touchedFields, isValid },
    getValues,
    ...rest
  } = useForm<IFormCheckout>({
    defaultValues: {
      email: "",
      phone: "",
      address: "",
      paymentMethod: "",
      note: "",
    },
    resolver: yupResolver(schemaCheckout),
  });
  const paymentMethodWatchValue = useWatch({
    control,
    name: "paymentMethod",
    defaultValue: "",
  });
  const handleGetProfileSuccess = () => {
    router.replace("/");
  };

  const onSubmit: SubmitHandler<IFormCheckout> = async (data) => {
    const body = {
      info_receiver: {
        name: data?.name,
        phone: data?.phone,
        address: data?.address,
      },
      cart_lines: cart,
      note: data?.note,
      paymentMethod: data?.paymentMethod,
    };
    if (paymentMethodWatchValue === "COD") {
      try {
        const data: any = await orderApi.paymentByCOD(body);
        if (data.success === true) {
          await dispatch(removeAllItemCart());
          router.push("/");
          alertNotification("Đặt hàng thành công");
        }
        return;
      } catch (error) {
        // showError(error);
      }
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <Layout>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item sm={12} md={4}>
              <Typography
                variant="h4"
                color="primary"
                className={classes.title}
              >
                Thông tin mua hàng
              </Typography>
              <Paper style={{ padding: "8px" }}>
                <InputField
                  control={control}
                  name="email"
                  errors={errors}
                  touched={touchedFields}
                  label="Email"
                />
                <InputField
                  control={control}
                  name="name"
                  errors={errors}
                  touched={touchedFields}
                  label="Tên người nhận"
                />
                <InputField
                  control={control}
                  name="phone"
                  errors={errors}
                  touched={touchedFields}
                  label="SĐT người nhận"
                />
                <InputField
                  control={control}
                  name="address"
                  errors={errors}
                  touched={touchedFields}
                  label="Địa chỉ người nhận"
                />
                <InputField
                  control={control}
                  name="note"
                  errors={errors}
                  touched={touchedFields}
                  label="Ghi chú"
                />
              </Paper>
            </Grid>
            <Grid item sm={12} md={4}>
              <Typography
                variant="h4"
                color="primary"
                // align="center"
                className={classes.title}
              >
                Thanh toán
              </Typography>
              <Paper style={{ padding: "8px" }}>
                <RadioBoxGroupField
                  control={control}
                  name="paymentMethod"
                  errors={errors}
                  touched={touchedFields}
                  // label="Phương thức thanh toán"
                  options={PAYMENT_METHOD_OPTIONS}
                />
              </Paper>
            </Grid>
            <Grid item sm={12} md={4}>
              <Typography
                variant="h4"
                color="primary"
                className={classes.title}
              >
                {`Đơn hàng (${totalQuantityProduct} sản phẩm)`}
              </Typography>
              <Paper style={{ padding: "8px" }}>
                <Box style={{ maxHeight: "450px", overflowY: "auto" }}>
                  {cart.length > 0 &&
                    cart.map((c: CartItem) => {
                      return (
                        <Box
                          display="flex"
                          py="10px"
                          key={`${c.product_id} - ${c.variant}`}
                        >
                          <Box
                            style={{ maxWidth: "85px", position: "relative" }}
                          >
                            <img
                              alt={c.name}
                              src={c.image}
                              style={{ borderRadius: "4px" }}
                            />
                            <Box
                              style={{
                                position: "absolute",
                                top: "0",
                                right: "0",
                                borderRadius: "5px",
                                background: "#000",
                                color: "#fff",
                                padding: "2px 8px",
                                fontWeight: "bold",
                                transform: "translate(25%, -50%)",
                              }}
                            >
                              {c.quantity}
                            </Box>
                          </Box>
                          <Box flexGrow="1" ml="10px">
                            <Typography
                              style={{ fontSize: "14px", paddingRight: "15px" }}
                            >
                              {c.name}
                            </Typography>
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <Typography
                                variant="body2"
                                style={{ color: "#a9a1a1" }}
                              >
                                {c.variant}
                              </Typography>
                              <Typography
                                component="span"
                                style={{
                                  fontWeight: "bold",
                                  marginLeft: "8px",
                                  color: "#a9a1a1",
                                }}
                              >
                                {formatCurrency(c.price)}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      );
                    })}
                </Box>
                <Divider />
                <Typography
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: "8px 0px",
                  }}
                >
                  <span>Tạm tính: </span>
                  <span>{formatCurrency(totalPrice || 0)}</span>
                </Typography>
                <Typography
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: "8px 0px",
                  }}
                >
                  <span>Phí vận chuyển: </span>
                  <span>__</span>
                </Typography>
                <Divider />
                <Typography
                  variant="h5"
                  color="primary"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: "8px 0px",
                    fontWeight: "bold",
                  }}
                >
                  <span>Tổng cộng: </span>
                  <span>{formatCurrency(totalPrice || 0)}</span>
                </Typography>
              </Paper>
              <Box my={"10px"} display="flex" alignItems="center">
                <MyButton onClick={() => {}} color="red" fullWidth>
                  <Link href="/cart">
                    <a
                      style={{
                        color: "#fff",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <NavigateBeforeRoundedIcon fontSize="small" />
                      Giỏ hàng
                    </a>
                  </Link>
                </MyButton>

                <MyButton
                  color="blue"
                  fullWidth
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <CircularProgress size={23} /> : "Thanh toán"}
                </MyButton>
                {/* <PayPalButton /> */}
              </Box>
            </Grid>
          </Grid>
        </form>
        {stripePromise ? (
          <Elements stripe={stripePromise}>
            <FormCheckOutCreditCard
              cart={cart}
              values={getValues}
              open={open}
              onClose={handleClose}
            />
          </Elements>
        ) : null}
      </Layout>
    </>
  );
};

export default Checkout;

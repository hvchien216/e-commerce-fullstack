import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Switch,
  Typography,
} from "@material-ui/core";
import { AppState, wrapper } from "@redux/store";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Home.module.css";
import { Fragment, ReactNode, useEffect, useState } from "react";
import Layout from "@components/Layout";
import { useDarkModeStore } from "@context/darkMode";
import { Theme } from "@material-ui/core/styles";
import { fetchNewProductList } from "@redux/product/actions";
import { END } from "@redux-saga/core";
import { SagaStore } from "@redux/store";
import ProductItem from "@components/ProductItem";
import { ObjectImageProduct, Product } from "@redux/product/types";
import apiProduct from "@redux/product/api";
import { ILogin } from "@redux/authUser/types";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import InputField from "@components/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import authApi from "@redux/authUser/api";
import { getProfile } from "@redux/authUser/actions";
import { formatCurrency, storedToken } from "@utils/index";
import { useRouter } from "next/router";
import Link from "@components/Link";
import CheckBoxGroupField, {
  IOptionRadioButton,
} from "@components/CheckBoxGroupField";
import { CartItem } from "@redux/cart/types";
import MyButton from "@components/Button";
import FormCheckOutCreditCard from "@components/FormCheckOutCreditCard";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import orderApi from "@redux/authUser/api";
import { removeAllItemCart } from "@redux/cart/actions";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
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
    // resolver: yupResolver(schemaCheckout),
  });
  const paymentMethodWatchValue = useWatch({
    control,
    name: "paymentMethod", // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
    defaultValue: "", // default value before the render
  });
  console.log(rest);
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
        }
        return;
      } catch (error) {
        console.log(error);
      }
    } else {
      setOpen(true);
    }
    // return new Promise((aa, bb) => {
    //   setTimeout(() => {
    //     aa(alert(JSON.stringify(data)));
    //   }, 3000);
    // });
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
                // align="center"
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
              {/* <Grid item xs={12} md={6} className={classes.submitBox}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                >
                  {isSubmitting ? <CircularProgress size={23} /> : "Signin"}
                </Button>
                <Link href="/register">Signup</Link>
              </Grid> */}
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
                <CheckBoxGroupField
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
                // align="center"
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

// export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
//   // if (store.getState().products.newProductList.length) {
//   // const data: any = await apiProduct.getBestSellerProductList();
//   // await store.dispatch(fetchNewProductList());
//   // store.dispatch(END);
//   // }
//   // await (store as SagaStore).sagaTask.toPromise();
//   // const fetchParallel: any = await Promise.all([
//   //   apiProduct.getNewProductList(),
//   //   apiProduct.getBestSellerProductList(),
//   // ]);
//   // return {
//   //   props: {
//   //     bestSellerList: fetchParallel[0].products,
//   //     newProductList: fetchParallel[1].products,
//   //   },
//   // };
// });

export default Checkout;

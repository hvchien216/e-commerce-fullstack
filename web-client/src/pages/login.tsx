import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
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
import { SubmitHandler, useForm } from "react-hook-form";
import InputField from "@components/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import authApi from "@redux/authUser/api";
import { getProfile } from "@redux/authUser/actions";
import { alertNotification, storedToken } from "@utils/index";
import { useRouter } from "next/router";
import Link from "@components/Link";
import { showError } from "@config/ServiceErrors";

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
const schemaLogin = yup.object().shape({
  email: yup.string().required("Vui lòng nhập Email"),
  password: yup.string().required("Vui lòng nhập mật khẩu"),
});

const schemaForgotPwd = yup.object().shape({
  email: yup.string().required("Vui lòng nhập Email"),
});

const Login = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: AppState) => state.authUser.user);
  // useEffect(() => {
  if (user) {
    router.replace("/");
  }
  // }, []);
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, touchedFields },
  } = useForm<ILogin>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schemaLogin),
  });

  const {
    handleSubmit: handleSubmitForgotPwd,
    control: controlForgotPwd,
    formState: formStateForgotPwd,
  } = useForm<Omit<ILogin, "password">>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schemaForgotPwd),
  });

  const handleGetProfileSuccess = () => {
    router.replace("/");
    setTimeout(() => {
      alertNotification("Đăng nhập thành công");
    }, 1100);
  };

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    try {
      const token: any = await authApi.login(data);
      if (token) {
        await storedToken(token);
        dispatch(getProfile(handleGetProfileSuccess, true));
      }
    } catch (error) {
      showError(error);
    }
  };

  const onSubmitForgotPwd: SubmitHandler<Omit<ILogin, "password">> = async (
    data
  ) => {
    try {
      const result: any = await authApi.forgotPassword(data);
      alertNotification(
        "Vui lòng kiểm tra hòm thư, để xác nhận lấy lại mật khẩu!"
      );
    } catch (error) {
      showError(error);
    }
  };

  return (
    <>
      <Layout>
        <Grid container spacing={2}>
          <Grid item sm={12} md={6}>
            <Typography variant="h3" color="primary" className={classes.title}>
              Đăng nhập
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                control={control}
                name="email"
                errors={errors}
                touched={touchedFields}
                label="Email"
              />
              <InputField
                control={control}
                name="password"
                type="password"
                errors={errors}
                touched={touchedFields}
                label="Mật khẩu"
              />
              <Grid item xs={12} md={6} className={classes.submitBox}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                >
                  {isSubmitting ? <CircularProgress size={23} /> : "Đăng nhập"}
                </Button>
                <Link href="/register" style={{ marginLeft: "8px" }}>
                  Đăng ký
                </Link>
              </Grid>
            </form>
          </Grid>
          <Grid item sm={12} md={6}>
            <Typography variant="h3" color="primary" className={classes.title}>
              Quên mật khẩu
            </Typography>
            <form onSubmit={handleSubmitForgotPwd(onSubmitForgotPwd)}>
              <InputField
                control={controlForgotPwd}
                name="email"
                errors={formStateForgotPwd.errors}
                touched={formStateForgotPwd.touchedFields}
                label="Email của bạn"
              />
              <Grid item xs={12} md={6} className={classes.submitBox}>
                <Button
                  type="submit"
                  disabled={formStateForgotPwd.isSubmitting}
                  variant="contained"
                  color="primary"
                >
                  {formStateForgotPwd.isSubmitting ? (
                    <CircularProgress size={23} />
                  ) : (
                    "Lấy lại mật khẩu"
                  )}
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default Login;

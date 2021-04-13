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
import { ILogin, IResetPassword } from "@redux/authUser/types";
import { SubmitHandler, useForm } from "react-hook-form";
import InputField from "@components/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import authApi from "@redux/authUser/api";
import { getProfile } from "@redux/authUser/actions";
import { alertNotification, storedToken } from "@utils/index";
import { useRouter } from "next/router";
import Link from "@components/Link";

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
const schemaResetPwd = yup.object().shape({
  password: yup.string().required("Vui lòng nhập mật khẩu"),
});

const ResetPassword = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, touchedFields },
  } = useForm<IResetPassword>({
    defaultValues: {
      password: "",
    },
    resolver: yupResolver(schemaResetPwd),
  });

  const onSubmit: SubmitHandler<IResetPassword> = async (data) => {
    try {
      const result: any = await authApi.resetPassword(
        router.query.userid as string,
        router.query.token as string,
        data
      );
      alertNotification("Đặt lại mật khẩu thành công");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout>
        <Grid container spacing={2}>
          <Grid item sm={12} md={6}>
            <Typography variant="h3" color="primary" className={classes.title}>
              Lấy lại mật khẩu
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                control={control}
                name="password"
                type="password"
                errors={errors}
                touched={touchedFields}
                label="Mật khẩu mới"
              />
              <Grid item xs={12} md={6} className={classes.submitBox}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                >
                  {isSubmitting ? <CircularProgress size={23} /> : "Gửi"}
                </Button>
              </Grid>
            </form>
          </Grid>
          <Grid item sm={12} md={6}></Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default ResetPassword;

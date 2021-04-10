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
import { storedToken } from "@utils/index";
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
const schemaLogin = yup.object().shape({
  email: yup.string().required("Email is a required field"),
  password: yup.string().required("Password is a required field"),
});
const Login = ({ bestSellerList, newProductList, navbarList }: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { isSubmitting, errors, touchedFields, isValid },
    ...rest
  } = useForm<ILogin>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schemaLogin),
  });

  const handleGetProfileSuccess = () => {
    router.replace("/");
  };

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    try {
      const token: any = await authApi.login(data);
      if (token) {
        await storedToken(token);
        dispatch(getProfile(handleGetProfileSuccess, true));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout>
        <Grid container spacing={2}>
          <Grid item sm={12} md={6}>
            <Typography
              variant="h3"
              color="primary"
              align="center"
              className={classes.title}
            >
              Signin
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                control={control}
                name="email"
                errors={errors}
                touched={touchedFields}
              />
              <InputField
                control={control}
                name="password"
                type="password"
                errors={errors}
                touched={touchedFields}
              />
              <Grid item xs={12} md={6} className={classes.submitBox}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                >
                  {isSubmitting ? <CircularProgress size={23} /> : "Signin"}
                </Button>
                <Link href="/register">Signup</Link>
              </Grid>
            </form>
          </Grid>
          <Grid item sm={12} md={6}></Grid>
        </Grid>
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

export default Login;

import {
  Button,
  Grid,
  Link,
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
}));

const Home = ({ bestSellerList, newProductList, navbarList }: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const { newProductList } = useSelector((state: AppState) => state.products);

  const renderFeatureProduct = (data: Product[] = []): ReactNode => {
    return data?.map((p: Product) => {
      let imgPrimary = p.images.filter(
        (img: ObjectImageProduct) => img.primary === true
      );
      let variantFirst = p.variants[0];
      return (
        <Fragment key={`${p?.name} ${p?._id}`}>
          <Grid item md={3} sm={4} xs={2}>
            <ProductItem
              id={p?._id}
              name={p?.name}
              code={p?.code}
              url={imgPrimary[0]?.url}
              price={variantFirst.unit_price}
              discount_rate={variantFirst.discount_rate}
              slug={p?.slug_name}
            />
          </Grid>
        </Fragment>
      );
    });
  };

  return (
    <>
      <Layout>
        <Typography
          variant="h3"
          color="primary"
          align="center"
          className={classes.title}
        >
          New Product
        </Typography>
        <Grid container spacing={2}>
          {renderFeatureProduct(newProductList)}
        </Grid>
        <Typography
          variant="h3"
          color="primary"
          align="center"
          className={classes.title}
        >
          Best Seller
        </Typography>
        <Grid container spacing={2}>
          {renderFeatureProduct(bestSellerList)}
        </Grid>
      </Layout>
    </>
  );
};

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  // if (store.getState().products.newProductList.length) {
  // const data: any = await apiProduct.getBestSellerProductList();
  // await store.dispatch(fetchNewProductList());
  // store.dispatch(END);
  // }
  // await (store as SagaStore).sagaTask.toPromise();

  const fetchParallel: any = await Promise.all([
    apiProduct.getNewProductList(),
    apiProduct.getBestSellerProductList(),
  ]);
  return {
    props: {
      bestSellerList: fetchParallel[0].products,
      newProductList: fetchParallel[1].products,
    },
  };
});

export default Home;

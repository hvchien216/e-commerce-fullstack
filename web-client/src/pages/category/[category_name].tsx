import React, {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  Fragment,
  useEffect,
  useState,
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
  Box,
  CircularProgress,
  createStyles,
  Grid,
  IconButton,
  Paper,
  TextField,
  Theme,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import Link from "next/link";
import {
  formatCurrency,
  formarDiscountPrice,
  calculateDiscountPrice,
} from "@utils/index";
import { HIGHT_LIGHT_COLOR } from "@utils/theme";
import { GetStaticProps } from "next";
import {
  Category,
  ObjectImageProduct,
  Product,
  Variant,
} from "@redux/product/types";
import { ParsedUrlQuery } from "node:querystring";
import apiProduct from "@redux/product/api";
import Layout from "@components/Layout";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import AddBoxIcon from "@material-ui/icons/AddBox";
import MyButton from "@components/Button";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { useDispatch } from "react-redux";
import { addToCart } from "@redux/cart/actions";
import { useRouter } from "next/router";
import { useDrawerCartStore } from "@context/drawerCart";
import ProductList from "@components/ProductList";

interface Props {
  products: Product[];
  totalPage: number;
  page: number;
}
const ProductListByCategory: FC<Props> = (props) => {
  return <ProductList {...props} path="/category" />;
};

export default ProductListByCategory;
type Params = {
  params: {
    category_name: string;
  };
};
export const getStaticPaths = async () => {
  const data: any = await apiProduct.getCategoryList();
  let paths = data.categogies
    ? data?.categogies.map((c: Category) => {
        let href = c._id.replace("/", "-").toLowerCase();
        return {
          params: { category_name: href },
        };
      })
    : [];
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: Params) => {
  const { category_name } = params;

  try {
    const data: any = await apiProduct.getProductList({
      category: category_name.replace("-", "/"),
    });
    return data?.products
      ? {
          props: {
            products: data?.products,
            totalPage: data?.totalPage,
            page: data?.page,
          },
        }
      : { notFound: true };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};

import React, {
  ChangeEvent,
  FC,
  Fragment,
  useCallback,
  useEffect,
  useState,
} from "react";
import apiProduct from "@redux/product/api";
import {
  Brand,
  ObjectImageProduct,
  Product,
  Variant,
} from "@redux/product/types";
import { AppContext } from "next/app";
import { GetServerSidePropsContext } from "next";
import Layout from "@components/Layout";
import {
  Box,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import ProductItem from "@components/ProductItem";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import { FILTER_BY_RANGE_PRICE } from "@config/index";
import CircleProgress from "@components/CircleProgress";
import { useRouter } from "next/router";
import { removeBlankAttbObj } from "@utils/index";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductList from "@components/ProductList";
interface BrandCheckBox extends Brand {
  checked: boolean;
}
interface VariantCheckBox {
  _id: string;
  name: string;
  checked: boolean;
}
interface Props {
  products: Product[];
  totalPage: number;
  page: number;
  brands: BrandCheckBox[];
  variants: VariantCheckBox[];
}

const Collections: FC<Props> = (props) => {
  return <ProductList {...props} path="/products" />;
};
export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const {
    keyword,
    category,
    brands: brandQuery,
    from,
    to,
    sizes,
    page,
    limit,
  } = query;
  let products = [];
  let brands = [];
  let variants = [];
  const fetchParallel: any = await Promise.all([
    apiProduct.getProductList({ ...query }),
    // apiProduct.getBrandList(),
    // apiProduct.getVariantList(),
  ]);
  products = fetchParallel[0].products;
  // brands = fetchParallel[1].brands;
  // variants = fetchParallel[2].variants;
  return {
    props: {
      products,
      totalPage: fetchParallel[0]?.totalPage || 1,
      page: fetchParallel[0]?.page || 1,
      // brands,
      // variants,
    },
  };
};
export default Collections;

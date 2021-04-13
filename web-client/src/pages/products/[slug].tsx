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
import { ObjectImageProduct, Product, Variant } from "@redux/product/types";
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
interface PropsProductDetail {
  color?: "red" | "blue";
  product: Product;
  notFound?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // background: (props: Props) =>
    //   props.color === "red"
    //     ? "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
    //     : "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    // border: 0,
    // borderRadius: 3,
    // boxShadow: (props: PropsProductDetail) =>
    //   props.color === "red"
    //     ? "0 3px 5px 2px rgba(255, 105, 135, .3)"
    //     : "0 3px 5px 2px rgba(33, 203, 243, .3)",
    flexGrow: 1,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  productImg: {
    display: "block",
    position: "relative",
    overflow: "hidden",
  },
  productSale: {
    position: "absolute",
    left: 10,
    top: 10,
    fontSize: 12,
    fontHeight: "bold",
    zIndex: 9,
    background: theme.palette.secondary.contrastText,
    color: "#ffffffde",
    borderRadius: "50%",
    width: 35,
    height: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  productName: {
    fontSize: 16,
    fontWeight: 500,
  },
  boxProPrices: {
    fontSize: "35px",
    margin: 0,
    fontWeight: 700,
  },
  boxPriceDel: {
    color: "#939393",
    fontSize: 13,
    marginLeft: 5,
    fontWeight: "normal",
  },
  boxImage: {},
  boxInfo: {
    position: "sticky",
    top: "80px",
  },
  variantItem: {
    minWidth: "unset",
  },
  brandName: {
    marginLeft: theme.spacing(1),
    fontWeight: "bold",
    color: theme.palette.secondary.contrastText,
  },
  inputQuantity: {
    width: "65px",
    textAlign: "center",
    "& .MuiInputBase-root .MuiInputBase-input.MuiInput-input": {
      textAlign: "center",
      fontWeight: "bold",
    },
  },
  contentCarousel: {
    width: "80%",
    margin: "0 auto",
    paddingBottom: theme.spacing(16),
    "& .slick-slider.slick-initialized .slick-dots": {
      bottom: 'calc(-100% + "10px")',
    },
  },
  txtDescription: {
    "-webkitUserModify": "read-write-plaintext-only",
  },
}));

const ProductDetail: FC<PropsProductDetail> = (props: PropsProductDetail) => {
  const classes = useStyles(props);
  const router = useRouter();
  const { setDrawerCart } = useDrawerCartStore();
  const dispatch = useDispatch();
  const { product, notFound } = props;
  const [productState, setProductState] = useState<Product | any>(
    product || {}
  );
  const {
    _id: product_id,
    name,
    code,
    slug_name,
    description,
    category_id: categoryName,
    brand,
    images,
    variants,
  } = productState;

  const settings = {
    customPaging: function (i: number) {
      return (
        <a>
          <img width="80px" src={images[i].url} alt="" />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  let mapSize = variants
    ?.map(
      (
        {
          variant: { name: nameVariant },
          unit_price,
          discount_rate,
          inStock,
          saled,
        }: Variant,
        index: number
      ) => ({
        id: index,
        name: nameVariant,
        unit_price,
        inStock,
        discount_rate,
        saled,
      })
    )
    .sort();
  const [variantSelected, setvariantSelected] = useState(
    mapSize?.length > 0 ? mapSize[0] : {}
  );
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    setProductState(props.product || {});
    let mapSize = props.product?.variants
      ?.map(
        (
          {
            variant: { name: nameVariant },
            unit_price,
            discount_rate,
            inStock,
            saled,
          }: Variant,
          index: number
        ) => ({
          id: index,
          name: nameVariant,
          unit_price,
          inStock,
          discount_rate,
          saled,
        })
      )
      .sort();
    setvariantSelected(mapSize?.length > 0 ? mapSize[0] : {});
  }, [props.product]);

  let priceAfterDiscount = formarDiscountPrice(
    variantSelected.unit_price || 0,
    variantSelected.discount_rate || 0
  );

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
    // let isnum = /^\d+$/.test(val);
    // /^\d*\.?\d*$/.test(value)
    if (+e.target.value === 0) return;
    if (+e.target.value > variantSelected.inStock) {
      setQuantity(variantSelected.inStock);
      return;
    }
    setQuantity(+e.target.value);
  };
  const isNumberKey = (evt: any) => {
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
    return true;
  };

  const handleSelectVariant = (v: any) => {
    if (quantity > v.inStock) {
      setQuantity(v.inStock);
    }
    setvariantSelected(v);
  };

  const handleAddToCart = (isBuyNow: boolean) => {
    let image = images.filter(
      (img: ObjectImageProduct) => img.primary === true
    );
    let valPrice = calculateDiscountPrice(
      variantSelected?.unit_price || 0,
      variantSelected?.discount_rate
    );
    const data = {
      product_id,
      name,
      slug_name,
      variant: variantSelected?.name,
      quantity,
      inStock: variantSelected?.inStock,
      price: valPrice,
      total: quantity * valPrice,
      image: image[0]?.url,
    };
    dispatch(addToCart(data));
    if (isBuyNow) {
      router.push("/checkout");
    } else {
      setDrawerCart(true);
    }
  };

  const renderVariant = () => {
    return mapSize?.map((v: any, index: number) => {
      return (
        <Fragment key={`variant-${index}`}>
          <Button
            onClick={() => handleSelectVariant(v)}
            variant={variantSelected?.id === index ? "contained" : "outlined"}
            color="primary"
            classes={{ root: classes.variantItem }}
            style={{ marginLeft: index === 0 ? "0" : "5px" }}
            disabled={v.inStock < 1}
          >
            {v?.name}
          </Button>
        </Fragment>
      );
    });
  };

  if (router.isFallback) {
    return (
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress color="secondary" size="60px" />
      </Box>
    );
  }
  return (
    <Layout>
      <Box className={classes.root}>
        <Grid container spacing={1}>
          <Grid item md={7} sm={12}>
            <Box className={classes.contentCarousel}>
              <Slider {...settings}>
                {images?.map((img: ObjectImageProduct, index: number) => (
                  <img
                    className="slider-img-item"
                    key={"show-img-slider" + index}
                    src={img.url}
                    alt={name}
                  />
                ))}
              </Slider>
            </Box>
            <Box my={"10px"}>
              <Typography component="h6" color="primary">
                Description:
              </Typography>
              <Typography
                component="span"
                color="textSecondary"
                className={classes.txtDescription}
              >
                {description}
              </Typography>
            </Box>
          </Grid>
          <Grid item md={5} sm={12} className={classes.boxInfo}>
            <Paper style={{ position: "sticky", top: "25px" }}>
              <Box px={"12px"} pt={"12px"}>
                <Box className={classes.boxInfo}>
                  <Box mb="10px">
                    <Typography component="h4" className={classes.productName}>
                      {code && `[${code}] `}
                      {name}
                    </Typography>
                  </Box>
                  <Box py={"10px"}>
                    <Typography component="h5">
                      Thương hiệu:
                      <Link
                        href={{
                          pathname: `/products/`,
                          query: { brands: `${brand?.name}` },
                        }}
                        passHref
                      >
                        <a className={classes.brandName} title={brand?.name}>
                          {brand?.name}
                        </a>
                      </Link>
                    </Typography>
                  </Box>
                  <Typography
                    component="p"
                    className={classes.boxProPrices}
                    color="primary"
                  >
                    {variantSelected?.discount_rate && (
                      <span
                        style={{
                          color: HIGHT_LIGHT_COLOR,
                          fontSize: "13px",
                          marginRight: 5,
                        }}
                      >
                        {`-${variantSelected?.discount_rate}%`}{" "}
                      </span>
                    )}
                    {formatCurrency(priceAfterDiscount || 0)}{" "}
                    {variantSelected?.discount_rate && (
                      <span className={classes.boxPriceDel}>
                        <del>
                          {formatCurrency(variantSelected?.unit_price || 0)}
                        </del>
                      </span>
                    )}
                  </Typography>
                  <Box py={"10px"}>{renderVariant()}</Box>
                  <Box py={"10px"} fontWeight={600} fontSize={13}>
                    <Typography component="span" color="textSecondary">
                      {variantSelected?.inStock || 0} sản phẩm có sẵn
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                py={"10px"}
                style={{ display: "flex", alignItems: "center" }}
              >
                <IconButton
                  onClick={() => setQuantity((curr) => curr - 1)}
                  color="secondary"
                  aria-label="add an minus"
                  disabled={quantity <= 1 || variantSelected.inStock < 1}
                >
                  <IndeterminateCheckBoxIcon fontSize="large" />
                </IconButton>
                <TextField
                  className={classes.inputQuantity}
                  InputProps={{ disableUnderline: true }}
                  id="outlined-basic"
                  // type="number"
                  value={quantity}
                  onChange={handleChangeInput}
                  onKeyPress={isNumberKey}
                />
                <IconButton
                  onClick={() => setQuantity((curr) => curr + 1)}
                  color="secondary"
                  aria-label="add an plus"
                  disabled={
                    quantity >= variantSelected.inStock ||
                    variantSelected.inStock < 1
                  }
                >
                  <AddBoxIcon fontSize="large" />
                </IconButton>
              </Box>
              <Box
                my={"10px"}
                style={{ display: "flex", alignItems: "center" }}
              >
                <MyButton
                  onClick={() => handleAddToCart(false)}
                  color="red"
                  fullWidth
                  disabled={variantSelected?.inStock < 1}
                >
                  Thêm vào giỏ
                </MyButton>
                <MyButton
                  onClick={() => handleAddToCart(true)}
                  color="blue"
                  fullWidth
                  disabled={variantSelected?.inStock < 1}
                >
                  Mua ngay
                </MyButton>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default ProductDetail;
type Params = {
  params: {
    slug: string;
  };
};
export const getStaticPaths = async () => {
  const data: any = await apiProduct.getNewProductList();
  let paths = data.products
    ? data?.products.map((p: Product) => ({
        params: { slug: p?.slug_name },
      }))
    : [];
  return { paths, fallback: true };
};

export const getStaticProps = async ({ params }: Params) => {
  const { slug } = params;
  try {
    const data: any = await apiProduct.getProductDetail(slug);
    return data?.product
      ? { props: { product: data?.product } }
      : { notFound: true };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box, createStyles, Theme } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import Link from "next/link";
import { formatCurrency, formarDiscountPrice } from "@utils/index";
import { HIGHT_LIGHT_COLOR } from "@utils/theme";
interface Props {
  color?: "red" | "blue";
  id: string;
  name: string;
  code: string;
  url: string;
  price: number;
  discount_rate?: number;
  slug: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // background: (props: Props) =>
    //   props.color === "red"
    //     ? "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
    //     : "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: (props: Props) =>
      props.color === "red"
        ? "0 3px 5px 2px rgba(255, 105, 135, .3)"
        : "0 3px 5px 2px rgba(33, 203, 243, .3)",
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
    margin: "0 0 8px",
    position: "relative",
    fontSize: 14,
    color: theme.palette.primary.main,
    "& a": {
      color: theme.palette.primary.dark,
      fontWeight: "normal",
    },
  },
  boxProPrices: {
    fontSize: 14,
    margin: 0,
    fontWeight: 700,
    color: (props: Props) =>
      props.discount_rate && props.discount_rate > 0
        ? HIGHT_LIGHT_COLOR
        : theme.palette.secondary.contrastText,
  },
  boxPriceDel: {
    color: "#939393",
    fontSize: 13,
    marginLeft: 5,
    fontWeight: "normal",
  },
}));

// const ProductItem: FC<Props & Omit<MuiButtonProps, keyof Props>> = (props) => {
//   const { color, ...other } = props;
//   const classes = useStyles(props);
//   return <Button className={classes.root} {...other} />;
// };

const ProductItem: FC<Props> = (props) => {
  const classes = useStyles(props);
  const { color, name, code, url, price, discount_rate, id, slug } = props;
  let displayName = code ? `[${code}] ${name}` : `${name}`;
  let priceAfterDiscount = formarDiscountPrice(price, discount_rate);
  return (
    <Box className={classes.root} data-aos="flip-right">
      <Box className={classes.productImg}>
        {discount_rate && (
          <Box className={classes.productSale}>
            <Typography
              component="span"
              style={{ fontSize: 13, fontWeight: 600 }}
            >{`-${discount_rate}%`}</Typography>
          </Box>
        )}
        <Link
          href={{
            pathname: `/products/${slug}`,
            query: { slug: slug },
          }}
          as={`/products/${slug}`}
          passHref
        >
          <a style={{ display: "block" }}>
            <img alt={name} src={url} />
          </a>
        </Link>
      </Box>
      <Box style={{ padding: "20px 5px", textAlign: "center" }}>
        <Box>
          <Typography component="h3" noWrap className={classes.productName}>
            <Link
              href={{
                pathname: `/products/[slug]`,
                query: { slug: slug },
              }}
              as={`/products/${slug}`}
              passHref
            >
              <a title={name}>{displayName}</a>
            </Link>
          </Typography>
        </Box>
        <Box style={{ width: "100%" }}>
          <Typography component="p" className={classes.boxProPrices}>
            {formatCurrency(priceAfterDiscount)}{" "}
            {discount_rate && (
              <span className={classes.boxPriceDel}>
                <del>{formatCurrency(price)}</del>
              </span>
            )}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductItem;

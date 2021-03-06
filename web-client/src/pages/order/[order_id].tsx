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
  Hidden,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Theme,
  withStyles,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import Link from "next/link";
import {
  convertDateTime,
  formatCurrency,
  formarDiscountPrice,
  calculateDiscountPrice,
  RENDER_ORDER_STATUS_TAG,
} from "@utils/index";
import { HIGHT_LIGHT_COLOR } from "@utils/theme";
import { GetStaticProps } from "next";
import {
  Category,
  ObjectImageProduct,
  Order,
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
import apiOrder from "@redux/authUser/api";
import CircleProgress from "@components/CircleProgress";
import Tag from "@components/Tag";
import { showError } from "@config/ServiceErrors";

interface Props {
  products: Product[];
  totalPage: number;
  page: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontWeight: 500,
    fontSize: theme.typography.h3.fontSize,
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.typography.h5.fontSize,
    },
  },
  title2: {
    marginBottom: theme.spacing(1),
    fontWeight: 500,
    fontSize: theme.typography.h5.fontSize,
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.typography.body1.fontSize,
    },
  },
  productItem: {
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
  large: {
    width: "150px",
    height: "150px",
  },
  contentAvatar: {
    position: "relative",
  },
  btnEditImage: {
    position: "absolute",
    top: "70%",
    left: "55%",
    background: theme.palette.primary.main,
  },
  iconLoadingImage: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "stranlate(-50%,-50%)",
  },
}));
const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);
const OrderDetail: FC<Props> = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchOrder = async (orderId: any) => {
    setIsLoading(true);
    try {
      const data: any = await apiOrder.getMyOrderDetails(orderId);
      setIsLoading(false);
      setOrder(data?.order);
    } catch (error) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchOrder(router.query?.order_id);
  }, [router.query?.order_id]);
  let curr = RENDER_ORDER_STATUS_TAG(order?.status as any);

  return (
    <Layout>
      <Typography noWrap color="primary" className={classes.title}>
        Chi ti???t ????n h??ng {router.query?.order_id}
      </Typography>
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircleProgress />
        </Box>
      ) : !order ? (
        <Box
          my="40px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography>Kh??ng t??m th???y ????n h??ng</Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item sm={12} md={8}>
            <Typography className={classes.title2}>
              Th??ng tin s???n ph???m
            </Typography>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Th??ng tin s???n ph???m</StyledTableCell>
                  <StyledTableCell align="right">Gi??</StyledTableCell>
                  <StyledTableCell align="right">S??? l?????ng</StyledTableCell>
                  <StyledTableCell align="right">Th??nh ti???n</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order?.detais?.map((product) => {
                  let { product_id } = product;
                  let imgPrimary = product_id?.images.filter(
                    (img: ObjectImageProduct) => img.primary === true
                  );
                  return (
                    <StyledTableRow key={`order-${order._id}`}>
                      <StyledTableCell component="th" scope="row">
                        <Box display="flex">
                          <Link
                            href={{
                              pathname: `/products/${product_id?.slug_name}`,
                              query: {
                                slug: product_id?.slug_name,
                              },
                            }}
                          >
                            <Box style={{ width: "75px" }}>
                              <img
                                alt={product_id?.name}
                                src={imgPrimary[0]?.url}
                              />
                            </Box>
                          </Link>
                          <span style={{ padding: "0 5px" }}>
                            {`${product_id?.name} - ${product?.variant}`}
                          </span>
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {formatCurrency(product?.price || 0)}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {product?.quantity}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {formatCurrency(product?.total || 0)}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Grid>
          <Grid item sm={12} md={4}>
            <Typography className={classes.title2}>
              Th??ng tin ng?????i nh???n
            </Typography>
            <Typography gutterBottom>S??? ??i???n tho???i: {order?.phone}</Typography>
            <Typography gutterBottom>?????a ch???: {order?.address}</Typography>
            <Typography gutterBottom>
              Ng??y ?????t: {convertDateTime(order?.createdAt as any)}
            </Typography>
            <Typography gutterBottom>
              T???ng ti???n: {formatCurrency(order?.totalAmount || 0)}
            </Typography>
            {/* <Typography >H??nh th???c thanh to??n: </Typography> */}
            <Typography gutterBottom>
              Tr???ng th??i:{" "}
              {RENDER_ORDER_STATUS_TAG(order.status as any) ? (
                <Tag label={curr?.label} color={curr?.color} />
              ) : (
                "__"
              )}
            </Typography>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
};

export default OrderDetail;

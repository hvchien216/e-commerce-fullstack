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
      <Typography variant="h3" noWrap color="primary" className={classes.title}>
        Chi tiết đơn hàng {router.query?.order_id}
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
          <Typography>Không tìm thấy đơn hàng</Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item sm={12} md={8}>
            <Typography variant="h4">Thông tin sản phẩm</Typography>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Thông tin sản phẩm</StyledTableCell>
                  <StyledTableCell align="right">Giá</StyledTableCell>
                  <StyledTableCell align="right">Số lượng</StyledTableCell>
                  <StyledTableCell align="right">Thành tiền</StyledTableCell>
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
            <Typography variant="h4">Thông tin người nhận</Typography>
            <Typography gutterBottom>Số điện thoại: {order?.phone}</Typography>
            <Typography gutterBottom>Địa chỉ: {order?.address}</Typography>
            <Typography gutterBottom>
              Ngày đặt: {convertDateTime(order?.createdAt as any)}
            </Typography>
            <Typography gutterBottom>
              Tổng tiền: {formatCurrency(order?.totalAmount || 0)}
            </Typography>
            {/* <Typography >Hình thức thanh toán: </Typography> */}
            <Typography gutterBottom>
              Trạng thái:{" "}
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

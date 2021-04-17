import MyButton from "@components/Button";
import Layout from "@components/Layout";
import Link from "@components/Link";
import { Box, IconButton, TextField, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AddShoppingCartSharpIcon from "@material-ui/icons/AddShoppingCartSharp";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import {
  changeQuantityItemCart,
  removeItemFromCart,
} from "@redux/cart/actions";
import { CartItem, PayloadRemoveItemFromCart } from "@redux/cart/types";
import { AppState } from "@redux/store";
import { formatCurrency } from "@utils/index";
import { ChangeEvent, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
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

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontWeight: 500,
    fontSize: theme.typography.h3.fontSize,
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.typography.h5.fontSize,
    },
  },
  emptyCart: {
    fontWeight: 500,
    fontSize: theme.typography.h4.fontSize,
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.typography.h5.fontSize,
    },
  },
  totalPrice: {
    fontWeight: 500,
    fontSize: theme.typography.h4.fontSize,
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.typography.h5.fontSize,
    },
  },
  table: {},
  inputQuantity: {
    width: "65px",
    textAlign: "center",
    "& .MuiInputBase-root .MuiInputBase-input.MuiInput-input": {
      textAlign: "center",
      fontWeight: "bold",
    },
  },
  styleBtn: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
    },
  },
}));
const Cart: FC<any> = () => {
  const classes = useStyles();
  const cart = useSelector((state: AppState) => state.cart.myCart);
  const dispatch = useDispatch();
  const handleRemoveItemFromCart = (data: PayloadRemoveItemFromCart) => {
    dispatch(removeItemFromCart(data));
  };
  const totalPrice = cart
    ? cart.reduce((total, item) => {
        return (total = total + item.price * item.quantity);
      }, 0)
    : null;

  const handleChangeQuantityByBtn = (
    quantity: number,
    item: CartItem
  ): void => {
    dispatch(
      changeQuantityItemCart({
        product_id: item.product_id,
        variant: item.variant,
        quantity,
      })
    );
  };

  const handleChangeInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    item: CartItem
  ): void => {
    // let isnum = /^\d+$/.test(val);
    // /^\d*\.?\d*$/.test(value)\
    if (!Number(e.target.value)) {
      return;
    }
    if (+e.target.value === 0) return;
    if (+e.target.value > item.inStock) {
      dispatch(
        changeQuantityItemCart({
          product_id: item.product_id,
          variant: item.variant,
          quantity: item.inStock,
        })
      );
      return;
    }
    dispatch(
      changeQuantityItemCart({
        product_id: item.product_id,
        variant: item.variant,
        quantity: +e.target.value,
      })
    );
  };

  return (
    <>
      <Layout>
        <Box pb="250px">
          <Box my="20px">
            <Typography color="primary" className={classes.title}>
              Giỏ hàng
            </Typography>
            <Box my="20px" data-aos="flip-up">
              {cart.length > 0 ? (
                <TableContainer component={Paper}>
                  <Table
                    className={classes.table}
                    aria-label="customized table"
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Ảnh</StyledTableCell>
                        <StyledTableCell align="right">
                          Thông tin
                        </StyledTableCell>
                        <StyledTableCell align="right">Giá</StyledTableCell>
                        <StyledTableCell align="right">
                          Số lượng
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          Tổng cộng
                        </StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cart.map((row: CartItem) => (
                        <StyledTableRow key={`${row.name}-${row.variant}`}>
                          <StyledTableCell
                            component="th"
                            scope="row"
                            style={{ width: "150px" }}
                          >
                            <img src={row.image} />
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.name}
                            <p>{row.variant}</p>
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {formatCurrency(row.price)}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="flex-end"
                            >
                              <IconButton
                                onClick={() =>
                                  handleChangeQuantityByBtn(
                                    row.quantity - 1,
                                    row
                                  )
                                }
                                color="secondary"
                                aria-label="add an minus"
                                // disabled={row.quantity <= 1}
                              >
                                <IndeterminateCheckBoxIcon fontSize="large" />
                              </IconButton>
                              <TextField
                                className={classes.inputQuantity}
                                InputProps={{ disableUnderline: true }}
                                id="outlined-basic"
                                value={row.quantity}
                                onChange={(e) => handleChangeInput(e, row)}
                                // onKeyPress={isNumberKey}
                              />
                              <IconButton
                                onClick={() =>
                                  handleChangeQuantityByBtn(
                                    row.quantity + 1,
                                    row
                                  )
                                }
                                color="secondary"
                                aria-label="add an plus"
                                disabled={
                                  row.quantity >= row.inStock || row.inStock < 1
                                }
                              >
                                <AddBoxIcon fontSize="large" />
                              </IconButton>
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {formatCurrency(row?.total || 0)}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <IconButton
                              onClick={() =>
                                handleRemoveItemFromCart({
                                  product_id: row.product_id,
                                  variant: row.variant,
                                })
                              }
                              color="primary"
                              aria-label="delete prduct from cart"
                            >
                              <DeleteOutlineOutlinedIcon fontSize="small" />
                            </IconButton>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Box textAlign="center">
                  <Typography className={classes.emptyCart}>
                    {" "}
                    Không có gì trong giỏ hàng{" "}
                    <AddShoppingCartSharpIcon fontSize="large" />
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
          <Box
            my={"10px"}
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Typography className={classes.totalPrice} color="primary">
              Thành tiền: {formatCurrency(totalPrice || 0)}
            </Typography>
          </Box>
          <Box
            my={"10px"}
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <MyButton color="red" component={Link} href="/products">
              Tiếp tục mua hàng
            </MyButton>
            {cart.length > 0 && (
              <MyButton color="blue" component={Link} href="/products">
                Thanh toán
              </MyButton>
            )}
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default Cart;

import React, {
  ChangeEvent,
  FC,
  Fragment,
  useCallback,
  useEffect,
  useState,
} from "react";
import apiProduct from "@redux/product/api";
import apiOrder from "@redux/authUser/api";
import {
  Brand,
  ObjectImageProduct,
  Order,
  Product,
  Variant,
} from "@redux/product/types";
import { AppContext } from "next/app";
import { GetServerSidePropsContext } from "next";
import Layout from "@components/Layout";
import {
  Box,
  Grid,
  Hidden,
  Radio,
  RadioGroup,
  Typography,
  withStyles,
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
import {
  convertDateTime,
  formatCurrency,
  ORDER_TYPE_STATUSES,
  removeBlankAttbObj,
  RENDER_ORDER_STATUS_TAG,
} from "@utils/index";
import InfiniteScroll from "react-infinite-scroll-component";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Tag from "@components/Tag";
import Link from "@components/Link";
import { Pagination } from "@material-ui/lab";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

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
  path: string;
  // brands: BrandCheckBox[];
  // variants: VariantCheckBox[];
}

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    formControl: {
      margin: theme.spacing(2),
    },
    formControlSelect: {
      margin: theme.spacing(1, 0),
      minWidth: 120,
    },
  })
);
const MyOrderList: FC<any> = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const [orderList, setOrderList] = useState<Order[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currPage, setCurrPage] = useState<number>(props.page || 1);
  const [orderStatusActive, setOrderStatusActive] = useState<string>("");
  const [totalPage, setTotalPage] = useState<number>(props.totalPage | 1);
  const fetchOrderList = async (params: any) => {
    setIsLoading(true);
    const data: any = await apiOrder.getMyOrderList(params);
    setIsLoading(false);
    setOrderList(data?.orders);
    setTotalPage(data?.totalPage);
    setCurrPage(data?.page);
  };
  useEffect(() => {
    fetchOrderList({ page: currPage });
  }, []);
  const handlePageChange = async (e: any, value: any) => {
    setCurrPage(value);
    await fetchOrderList({ page: value, status: orderStatusActive });
  };

  const handleChangeStatus = async (e: ChangeEvent<{ value: unknown }>) => {
    setOrderStatusActive(e.target.value as any);
    await fetchOrderList({ page: currPage, status: e.target.value });
  };

  return (
    <>
      <FormControl variant="filled" className={classes.formControlSelect}>
        <InputLabel id="demo-simple-select-filled-label">Trạng thái</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={orderStatusActive}
          onChange={handleChangeStatus}
        >
          {ORDER_TYPE_STATUSES.map((status) => (
            <MenuItem value={status.value}>{status.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Mã ĐH</StyledTableCell>
            <StyledTableCell align="right">Ngày đặt</StyledTableCell>
            <StyledTableCell align="right">Giá trị ĐH</StyledTableCell>
            <Hidden smDown>
              <StyledTableCell align="right">TT người nhận</StyledTableCell>
            </Hidden>
            <StyledTableCell align="right">Trạng thái</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {!isLoading && orderList.length > 0
            ? orderList.map((order) => {
                let curr = RENDER_ORDER_STATUS_TAG(order.status as any);
                return (
                  <StyledTableRow key={`order-${order._id}`}>
                    <StyledTableCell component="th" scope="row">
                      <Link
                        href={{
                          pathname: `/order/${order._id}`,
                          query: {
                            order_id: order._id,
                          },
                        }}
                        as={`/order/${order._id}`}
                      >
                        {order._id}
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {convertDateTime(order.createdAt as any)}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {formatCurrency(order.totalAmount || 0)}
                    </StyledTableCell>
                    <Hidden smDown>
                      <StyledTableCell align="right">{`- ${order.receiver_name}
                     - ${order.phone}
                      - ${order.address}`}</StyledTableCell>
                    </Hidden>
                    <StyledTableCell align="right">
                      {RENDER_ORDER_STATUS_TAG(order.status as any) ? (
                        <Tag label={curr?.label} color={curr?.color} />
                      ) : (
                        "__"
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })
            : !isLoading && (
                <Box my="20px">
                  <Typography>Không có đơn hàng nào!</Typography>
                </Box>
              )}
        </TableBody>
      </Table>
      {isLoading && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircleProgress />
        </Box>
      )}
      {!isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "12px",
          }}
        >
          <Pagination
            defaultPage={1}
            page={currPage}
            count={totalPage}
            size="large"
            color="primary"
            shape="rounded"
            onChange={handlePageChange}
            showFirstButton={totalPage > 8}
            showLastButton={totalPage > 8}
          />
        </div>
      )}
    </>
  );
};

export default MyOrderList;

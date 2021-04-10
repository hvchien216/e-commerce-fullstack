import React, { FC, Fragment, ReactNode, useEffect, useState } from "react";
import {
  fade,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { Box, Divider, Drawer, Grid, Hidden } from "@material-ui/core";
import { useDarkModeStore } from "@context/darkMode";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import Brightness5Icon from "@material-ui/icons/Brightness5";
import Button, { ButtonProps } from "@material-ui/core/Button";
import Link from "@components/Link";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@redux/store";
import { toggleDarkMode } from "@redux/product/actions";
import { LINEAR_BLUE } from "@utils/theme";
import apiProduct from "@redux/product/api";
import { Product } from "@redux/product/types";
import { capitalizeFirstLetter, formatCurrency } from "@utils/index";
import { CartItem } from "@redux/cart/types";
import MyButton from "@components/Button";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { useDrawerCartStore } from "@context/drawerCart";
import { removeItemFromCart } from "@redux/cart/actions";
import { PayloadRemoveItemFromCart } from "@redux/cart/types";
import { logout } from "@redux/authUser/actions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    appBar: {
      background: LINEAR_BLUE,
    },
    menuList: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    menuListItemNav: {
      fontWeight: 500,
    },
    menuButton: {
      // marginRight: theme.spacing(2),
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    sectionDesktop: {
      marginLeft: "auto",
      display: "flex",
      // [theme.breakpoints.up("md")]: {
      //   display: "flex",
      // },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    navItem: {
      fontWeight: 500,
      color: theme.palette.primary.contrastText,
      textDecoration: "none",
      padding: theme.spacing(2),
      fontSize: theme.typography.h5.fontSize,
      "&:hover": {
        textDecoration: "none",
      },
    },
    cartDrawerContainer: {
      "& .MuiDrawer-paper": {
        padding: "60px 70px 250px",
        [theme.breakpoints.up("md")]: {
          width: "480px",
        },
        [theme.breakpoints.down("sm")]: {
          width: "320px",
          background: "red",
        },
      },
    },
  })
);

const dataMenu = [
  { id: "1", name: "Sneaker", value: "sneaker" },
  { id: "2", name: "Clothing", value: "clothing" },
  { id: "3", name: "Accessories", value: "accessories" },
];

const NavBar: FC<any> = ({ navbarListProp }: any) => {
  const classes = useStyles();
  // const { darkMode, setDarkMode } = useDarkModeStore();
  const dispatch = useDispatch();
  const darkMode = useSelector((state: AppState) => state.products.darkMode);
  const cart = useSelector((state: AppState) => state.cart.myCart);
  const user = useSelector((state: AppState) => state.authUser.user);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [navbarList, setNavbarList] = useState<any>([]);
  const [anchorSearch, setAnchorSearch] = useState<boolean>(false);
  const [anchorCart, setAnchorCart] = useState<boolean>(false);
  const { drawerCart, setDrawerCart } = useDrawerCartStore();
  const isMenuOpen = Boolean(anchorEl);
  const totalPrice = cart
    ? cart.reduce((total, item) => {
        return (total = total + item.price * item.quantity);
      }, 0)
    : null;

  const totalQuantity = () => {
    return cart.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  };
  useEffect(() => {
    const getNavBarList = async () => {
      const data: any = await apiProduct.getCategoryList();
      if (data?.categogies) {
        setNavbarList(data?.categogies);
      }
    };
    getNavBarList();
  }, []);

  const setDarkMode = () => {
    dispatch(toggleDarkMode());
  };
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleToggleDrawerSearch = (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setAnchorSearch(!anchorSearch);
  };

  const handleToggleDrawerCart = (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setDrawerCart(!drawerCart);
  };

  const handleRemoveItemFromCart = (data: PayloadRemoveItemFromCart) => {
    dispatch(removeItemFromCart(data));
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {user ? (
        <Box>
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>My account</MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              dispatch(logout());
            }}
          >
            Logout
          </MenuItem>
        </Box>
      ) : (
        <Box>
          <MenuItem onClick={handleMenuClose}>
            <Link href={`/login`}>Signin</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>Signup</MenuItem>
        </Box>
      )}
      {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
    </Menu>
  );

  return (
    <>
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar className={classes.appBar}>
            <Typography variant="h5" noWrap>
              <Link href="/" color="secondary">
                <span> Jis Shop</span>
              </Link>
            </Typography>
            <div className={`${classes.grow} ${classes.menuList}`}>
              <Hidden smDown>
                {navbarList.map((d: any) => {
                  let href = d._id.replace("/", "-").toLowerCase();
                  return (
                    <Link
                      key={`${d._id}`}
                      href={`/${href}`}
                      color="secondary"
                      className={classes.navItem}
                    >
                      <span>{capitalizeFirstLetter(d._id.toLowerCase())}</span>
                    </Link>
                  );
                })}
              </Hidden>
            </div>
            <div className={classes.sectionDesktop}>
              <IconButton
                onClick={handleToggleDrawerSearch}
                aria-label="Search products"
                color="inherit"
              >
                <SearchIcon fontSize="small" />
              </IconButton>
              <IconButton
                onClick={handleToggleDrawerCart}
                aria-label="My cart"
                color="inherit"
              >
                <Badge badgeContent={totalQuantity()} color="secondary">
                  <ShoppingCartOutlinedIcon fontSize="small" />
                </Badge>
              </IconButton>
              {/* <IconButton
                onClick={setDarkMode}
                aria-label="My cart"
                color="inherit"
              >
                {darkMode ? (
                  <Brightness5Icon fontSize="small" />
                ) : (
                  <Brightness2Icon fontSize="small" />
                )}
              </IconButton> */}
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircleOutlinedIcon fontSize="small" />
              </IconButton>
              <Hidden mdUp>
                <IconButton
                  // edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="open drawer"
                >
                  <MenuIcon fontSize="small" />
                </IconButton>
              </Hidden>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </div>
      <Drawer
        anchor="right"
        open={anchorSearch}
        onClose={handleToggleDrawerSearch}
        variant="temporary"
      >
        <Typography> This is the drawer search product</Typography>
      </Drawer>
      <Drawer
        anchor="right"
        open={drawerCart}
        onClose={handleToggleDrawerCart}
        className={classes.cartDrawerContainer}
      >
        <Typography component="h5">Cart</Typography>
        <Box mt="40px">
          {cart.length > 0
            ? cart.map((c: CartItem) => {
                return (
                  <Fragment key={`cartItem in Drawer-${c.name}${c.variant}`}>
                    <Box
                      display="flex"
                      py="10px"
                      style={{ position: "relative" }}
                    >
                      <IconButton
                        onClick={() =>
                          handleRemoveItemFromCart({
                            product_id: c.product_id,
                            variant: c.variant,
                          })
                        }
                        style={{
                          position: "absolute",
                          right: "-20px",
                          top: "-5px",
                        }}
                        color="primary"
                        aria-label="delete prduct from cart"
                      >
                        <CloseRoundedIcon fontSize="small" />
                      </IconButton>
                      <Box style={{ maxWidth: "85px" }}>
                        <Link
                          href={`/products/[slug]`}
                          as={`/products/${c.slug_name}`}
                          passHref
                        >
                          <img alt={c.name} src={c.image} />
                        </Link>
                      </Box>
                      <Box flexGrow="1" ml="10px">
                        <Typography
                          style={{ fontSize: "14px", paddingRight: "15px" }}
                        >
                          {c.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          style={{ color: "#a9a1a1" }}
                        >
                          {c.variant}
                        </Typography>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Typography component="p">{c.quantity}</Typography>
                          <Typography
                            component="span"
                            style={{
                              fontWeight: "bold",
                              marginLeft: "8px",
                              color: "#a9a1a1",
                            }}
                          >
                            {formatCurrency(c.price)}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Fragment>
                );
              })
            : "Your cart is empty!"}
          <Divider light={false} />
          <Box
            my="20px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography component="p">Total: </Typography>
            <Typography
              component="span"
              style={{
                fontWeight: "bold",
                marginLeft: "8px",
              }}
              color="primary"
            >
              {formatCurrency(totalPrice || 0)}
            </Typography>
          </Box>
          <Box my={"10px"} display="flex" alignItems="center">
            <MyButton onClick={() => {}} color="red" fullWidth>
              <Link href="/cart">
                <span style={{ color: "#fff", textDecoration: "none" }}>
                  Giỏ hàng
                </span>
              </Link>
            </MyButton>
            <MyButton color="blue" fullWidth>
              <Link href="/checkout">Thanh toán</Link>
            </MyButton>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default NavBar;

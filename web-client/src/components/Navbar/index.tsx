import MyButton from "@components/Button";
import CircleProgress from "@components/CircleProgress";
import Link from "@components/Link";
import { useDrawerCartStore } from "@context/drawerCart";
import { Box, Divider, Drawer, Hidden } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {
  createStyles,
  fade,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { logout } from "@redux/authUser/actions";
import { removeItemFromCart } from "@redux/cart/actions";
import { CartItem, PayloadRemoveItemFromCart } from "@redux/cart/types";
import { toggleDarkMode } from "@redux/product/actions";
import apiProduct from "@redux/product/api";
import { ObjectImageProduct, Product } from "@redux/product/types";
import { AppState } from "@redux/store";
import { capitalizeFirstLetter, formatCurrency } from "@utils/index";
import { LINEAR_BLUE } from "@utils/theme";
import debounce from "lodash/debounce";
import React, {
  ChangeEvent,
  FC,
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";

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
      color: theme.palette.primary.main,
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
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    navItem: {
      fontWeight: 500,
      color: theme.palette.common.black,
      textDecoration: "none",
      padding: theme.spacing(2),
      fontSize: theme.typography.h6.fontSize,
      "&:hover": {
        textDecoration: "none",
      },
      "&.active": {
        color: theme.palette.primary.main,
      },
    },
    cartDrawerContainer: {
      "& .MuiDrawer-paper": {
        [theme.breakpoints.up("md")]: {
          width: "480px",
          padding: "60px 70px 250px",
        },
        [theme.breakpoints.down("sm")]: {
          width: "320px",
          padding: "30px 35px 200px",
        },
      },
    },
    MenuDrawerContainer: {
      "& .MuiDrawer-paper": {
        [theme.breakpoints.up("md")]: {
          width: "280px",
          padding: "20px 15px 250px",
        },
        [theme.breakpoints.down("sm")]: {
          width: "250px",
          padding: "20px 15px 250px",
        },
      },
    },
    logo: {
      fontWeight: "bold",
      "& a:hover": {
        textDecoration: "none",
      },
    },
  })
);

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
  const [anchorMenuNav, setAnchorMenuNav] = useState<boolean>(false);
  const { drawerCart, setDrawerCart } = useDrawerCartStore();
  const isMenuOpen = Boolean(anchorEl);
  const [isFetchingProduct, setIsFetchingProduct] = useState<boolean>(false);
  const [productList, setProductList] = useState<Product[]>([]);
  const refInput = useRef("");
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

  const handleToggleDrawerMenu = (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setAnchorMenuNav(!anchorMenuNav);
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

  const handleFetchProduct = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setProductList([]);
      return;
    }
    setIsFetchingProduct(true);
    try {
      const data: any = await apiProduct.getProductList({
        keyword: e.target.value,
        limit: 5,
      });
      //TO-DO: check status for error handling, and add pagination if needed.
      setProductList(data?.products || []);
    } catch (err) {
      console.log(err);
    }
    setIsFetchingProduct(false);
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
          <MenuItem onClick={handleMenuClose}>
            <Link href={`/account`}>Tài khoản</Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              dispatch(logout());
            }}
          >
            Đăng xuất
          </MenuItem>
        </Box>
      ) : (
        <Box>
          <MenuItem onClick={handleMenuClose}>
            <Link href={`/login`}>Đăng nhập</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link href={`/register`}>Đăng ký</Link>
          </MenuItem>
        </Box>
      )}
    </Menu>
  );

  return (
    <>
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar className={classes.appBar}>
            <Typography variant="h4" noWrap className={classes.logo}>
              <Link href="/" color="primary">
                <span>Anubis</span>
              </Link>
            </Typography>
            <div className={`${classes.grow} ${classes.menuList}`}>
              <Hidden smDown>
                {navbarList.map((d: any) => {
                  let href = d._id.replace("/", "-").toLowerCase();
                  return (
                    <Link
                      key={`${d._id}`}
                      href={{
                        pathname: `/category/${href}`,
                        query: { category_name: href },
                      }}
                      as={`/category/${href}`}
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
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleToggleDrawerMenu}
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
        open={anchorMenuNav}
        onClose={handleToggleDrawerMenu}
        variant="temporary"
        className={classes.MenuDrawerContainer}
      >
        <Box mt="20px" display="flex" flexDirection="column">
          {navbarList.map((d: any) => {
            let href = d._id.replace("/", "-").toLowerCase();
            return (
              <Link
                key={`${d._id}`}
                href={{
                  pathname: `/category/${href}`,
                  query: { category_name: href },
                }}
                as={`/category/${href}`}
                color="primary"
                className={classes.navItem}
              >
                <span>{capitalizeFirstLetter(d._id.toLowerCase())}</span>
              </Link>
            );
          })}
        </Box>
      </Drawer>
      <Drawer
        anchor="right"
        open={anchorSearch}
        onClose={handleToggleDrawerSearch}
        variant="temporary"
        className={classes.cartDrawerContainer}
      >
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            inputRef={refInput}
            placeholder="Nhập sản phẩm muốn tìm..."
            onChange={debounce(handleFetchProduct, 300)}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
        <Box mt="20px">
          {isFetchingProduct ? (
            <Box
              mt="40px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <CircleProgress />
            </Box>
          ) : productList.length > 0 ? (
            productList.map((c: Product) => {
              let imgPrimary = c.images.filter(
                (img: ObjectImageProduct) => img.primary === true
              );
              let variantFirst = c.variants[0];

              return (
                <Fragment
                  key={`product search in Drawer-${c._id}${c.slug_name}`}
                >
                  <Box
                    display="flex"
                    py="10px"
                    style={{ position: "relative" }}
                    data-aos="flip-left"
                  >
                    <Box style={{ maxWidth: "75px" }}>
                      <Link
                        href={`/products/[slug]`}
                        as={`/products/${c.slug_name}`}
                      >
                        <img alt={c.name} src={imgPrimary[0]?.url} />
                      </Link>
                    </Box>
                    <Box flexGrow="1" ml="10px">
                      <Typography style={{ fontSize: "14px" }}>
                        {c.name}
                      </Typography>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Typography
                          component="span"
                          style={{
                            fontWeight: "bold",
                            color: "#a9a1a1",
                          }}
                        >
                          {formatCurrency(variantFirst.unit_price)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Fragment>
              );
            })
          ) : (
            (refInput.current as any)?.value &&
            "Không tìm thấy sản phẩm phù hợp!"
          )}
          {productList.length > 0 && (
            <MyButton
              color="blue"
              fullWidth
              style={{ marginTop: "20px" }}
              component={Link}
              href={{
                pathname: "/products",
                query: {
                  keyword: (refInput.current as any)?.value,
                },
              }}
            >
              Xem thêm...
            </MyButton>
          )}
        </Box>
      </Drawer>
      <Drawer
        anchor="right"
        open={drawerCart}
        onClose={handleToggleDrawerCart}
        className={classes.cartDrawerContainer}
      >
        <Typography component="h5">Giỏ hàng</Typography>
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
            <Typography component="p">Tổng cộng: </Typography>
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

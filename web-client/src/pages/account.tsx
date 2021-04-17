import CircleProgress from "@components/CircleProgress";
import InputField from "@components/InputField";
import Layout from "@components/Layout";
import MyOrderList from "@components/MyOrderList";
import { showError } from "@config/ServiceErrors";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Tooltip,
  Typography,
  useTheme,
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import { getProfile } from "@redux/authUser/actions";
import authApi from "@redux/authUser/api";
import { IChangePassord } from "@redux/authUser/types";
import { AppState } from "@redux/store";
import { alertNotification } from "@utils/index";
import find from "lodash/find";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import * as yup from "yup";
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "200px",
    },
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

const convertToProfileDefaultValues = (data: any) => {
  const addressDefault = find(
    data?.info?.addresses || [],
    (a) => a.isDefault === true
  );
  return {
    name: data?.info?.name || "",
    email: data?.email || "",
    phone: data?.info?.phone || "",
    address: addressDefault ? addressDefault?.address : "",
  };
};

const schemaProfile = yup.object().shape({
  name: yup.string().required("Vui lòng nhập họ tên"),
  phone: yup
    .string()
    .required("Vui lòng nhập số điện thoại")
    .matches(
      /(03|07|08|09)+([0-9]{8})\b/,
      "Không đúng định dạng số điện thoại"
    ),
  address: yup.string().required("Vui lòng nhập địa chỉ"),
});

const schemaChangePwd = yup.object().shape({
  prevPassword: yup.string().required("Vui lòng nhập mật khẩu hiện tại"),
  newPassword: yup.string().required("Vui lòng nhập mật khẩu mới"),
});

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

interface ProfileForm {
  phone?: string;
  avatar?: string;
  address: any;
  email: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const Account = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();
  const [value, setValue] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const authUser = useSelector(
    (state: AppState) => state.authUser,
    shallowEqual
  );
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(
    authUser.user?.profile?.info?.avatar || undefined
  );

  if (!authUser?.isAuthenticated) {
    router.replace("/login");
  }

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  const {
    handleSubmit: handleSubmitChangePwd,
    control: controlChangePwd,
    formState: formStateChangePwd,
    reset: resetFormChangePwd,
  } = useForm<IChangePassord>({
    defaultValues: {
      prevPassword: "",
      newPassword: "",
    },
    resolver: yupResolver(schemaChangePwd),
  });

  const onSubmitChangePwd: SubmitHandler<IChangePassord> = async (data) => {
    try {
      const result: any = await authApi.changePassoword(data);
      if (result?.success) {
        alertNotification("Đổi mật khẩu thành công");
        resetFormChangePwd();
        setValue(0);
      }
    } catch (error) {
      showError(error);
    }
  };
  const handleGetProfileSuccess = () => {
    setTimeout(() => {
      alertNotification("Cập nhật thông tin thành công");
    }, 700);
  };
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, touchedFields },
  } = useForm<ProfileForm>({
    defaultValues: convertToProfileDefaultValues(authUser.user?.profile),
    resolver: yupResolver(schemaProfile),
  });

  const onSubmit: SubmitHandler<ProfileForm> = async (data) => {
    try {
      const body = {
        ...data,
        avatar: avatarUrl,
        addresses: [
          {
            address: data.address,
            isDefault: true,
          },
        ],
      };
      delete body["address"];
      const result: any = await authApi.updateProfile(body);
      if (result?.success) {
        dispatch(getProfile(handleGetProfileSuccess, true));
      }
    } catch (error) {
      showError(error);
    }
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput?.click();
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const image: any = (e.target as any)?.files[0];
    if (image) {
      setIsUploading(true);
      let formData = new FormData();
      formData.append("myFile", image, image.name);
      try {
        const result: any = await authApi.upload(formData);
        if (result.img) {
          setAvatarUrl(result?.img?.url);
        }
      } catch (error) {}
      setIsUploading(false);
    }
  };
  return (
    <>
      <Layout>
        <Grid
          container
          spacing={2}
          data-aos="zoom-in-down"
          className={classes.root}
        >
          <Grid item md={12}>
            <Typography color="primary" className={classes.title}>
              Thông tin tài khoản
            </Typography>
            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="Thông tin" {...a11yProps(0)} />
                <Tab label="Đơn hàng của tôi" {...a11yProps(1)} />
                <Tab label="Đổi mật khẩu" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <Paper style={{ minHeight: "430px" }}>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        style={{
                          height: "100%",
                        }}
                        className={classes.contentAvatar}
                      >
                        <Avatar
                          alt="Remy Sharp"
                          src={avatarUrl}
                          className={classes.large}
                        />
                        <input
                          type="file"
                          id="imageInput"
                          hidden={true}
                          onChange={handleImageChange}
                        />
                        <Tooltip
                          title="Upload Image"
                          className=""
                          placement="top"
                        >
                          <IconButton
                            onClick={handleEditPicture}
                            className={classes.btnEditImage}
                          >
                            <EditRoundedIcon />
                          </IconButton>
                        </Tooltip>
                        {isUploading && (
                          <Box className={classes.iconLoadingImage}>
                            <CircleProgress />
                          </Box>
                        )}
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <InputField
                          control={control}
                          name="name"
                          errors={errors}
                          touched={touchedFields}
                          label="Họ tên"
                        />
                        <InputField
                          control={control}
                          name="email"
                          errors={errors}
                          touched={touchedFields}
                          label="Email"
                          disabled={true}
                        />
                        <InputField
                          control={control}
                          name="phone"
                          errors={errors}
                          touched={touchedFields}
                          label="Số điện thoại"
                        />
                        <InputField
                          control={control}
                          name="address"
                          errors={errors}
                          touched={touchedFields}
                          label="Địa chỉ"
                        />
                        <Grid item xs={12} md={6} className={classes.submitBox}>
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            variant="contained"
                            color="primary"
                          >
                            {isSubmitting ? (
                              <CircularProgress size={23} />
                            ) : (
                              "Cập nhật"
                            )}
                          </Button>
                        </Grid>
                      </form>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <MyOrderList />
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <form onSubmit={handleSubmitChangePwd(onSubmitChangePwd)}>
                        <InputField
                          control={controlChangePwd}
                          name="prevPassword"
                          errors={formStateChangePwd?.errors}
                          touched={formStateChangePwd?.touchedFields}
                          label="Mật khẩu hiện tại"
                          type="password"
                        />
                        <InputField
                          control={controlChangePwd}
                          name="newPassword"
                          errors={formStateChangePwd?.errors}
                          touched={formStateChangePwd?.touchedFields}
                          label="Mật khẩu mới"
                          type="password"
                        />
                        <Grid item xs={12} md={6} className={classes.submitBox}>
                          <Button
                            type="submit"
                            disabled={formStateChangePwd?.isSubmitting}
                            variant="contained"
                            color="primary"
                          >
                            {formStateChangePwd?.isSubmitting ? (
                              <CircularProgress size={23} />
                            ) : (
                              "Đổi mật khẩu"
                            )}
                          </Button>
                        </Grid>
                      </form>
                    </Grid>
                  </Grid>
                </TabPanel>
              </SwipeableViews>
            </Paper>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default Account;

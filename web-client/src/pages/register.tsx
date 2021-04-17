import InputField from "@components/InputField";
import Layout from "@components/Layout";
import { showError } from "@config/ServiceErrors";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { getProfile } from "@redux/authUser/actions";
import authApi from "@redux/authUser/api";
import { IRegister } from "@redux/authUser/types";
import { AppState } from "@redux/store";
import { alertNotification, storedToken } from "@utils/index";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

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
}));
const schemaRegister = yup.object().shape({
  name: yup.string().required("Name is a required field"),
  email: yup.string().required("Email is a required field"),
  password: yup.string().required("Password is a required field"),
});
const Register = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: AppState) => state.authUser.user);
  if (user) {
    router.replace("/");
  }
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { isSubmitting, errors, touchedFields, isValid },
    ...rest
  } = useForm<IRegister>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schemaRegister),
  });

  const handleGetProfileSuccess = () => {
    router.replace("/");
    setTimeout(() => {
      alertNotification("Đăng ký thành công");
    }, 1100);
  };

  const onSubmit: SubmitHandler<IRegister> = async (data) => {
    try {
      const token: any = await authApi.register(data);
      if (token) {
        await storedToken(token);
        dispatch(getProfile(handleGetProfileSuccess, true));
      }
    } catch (error) {
      showError(error);
    }
  };

  return (
    <>
      <Layout>
        <Grid container spacing={2}>
          <Grid item sm={12} md={6}>
            <Typography
              color="primary"
              align="center"
              className={classes.title}
            >
              Đăng ký
            </Typography>
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
              />
              <InputField
                control={control}
                name="password"
                type="password"
                errors={errors}
                touched={touchedFields}
                label="Mật khẩu"
              />
              <Grid item xs={12} md={6} className={classes.submitBox}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                >
                  {isSubmitting ? <CircularProgress size={23} /> : "Đăng ký"}
                </Button>
              </Grid>
            </form>
          </Grid>
          <Grid item sm={12} md={6}></Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default Register;

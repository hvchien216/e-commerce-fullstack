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
import authApi from "@redux/authUser/api";
import { IResetPassword } from "@redux/authUser/types";
import { alertNotification } from "@utils/index";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
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
const schemaResetPwd = yup.object().shape({
  password: yup.string().required("Vui lòng nhập mật khẩu"),
});

const ResetPassword = (props: any) => {
  const classes = useStyles();
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, touchedFields },
  } = useForm<IResetPassword>({
    defaultValues: {
      password: "",
    },
    resolver: yupResolver(schemaResetPwd),
  });

  const onSubmit: SubmitHandler<IResetPassword> = async (data) => {
    try {
      const result: any = await authApi.resetPassword(
        router.query.userid as string,
        router.query.token as string,
        data
      );
      alertNotification("Đặt lại mật khẩu thành công");
    } catch (error) {
      showError(error);
    }
  };

  return (
    <>
      <Layout>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography color="primary" className={classes.title}>
              Lấy lại mật khẩu
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                control={control}
                name="password"
                type="password"
                errors={errors}
                touched={touchedFields}
                label="Mật khẩu mới"
              />
              <Grid item xs={12} md={6} className={classes.submitBox}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                >
                  {isSubmitting ? <CircularProgress size={23} /> : "Gửi"}
                </Button>
              </Grid>
            </form>
          </Grid>
          <Grid item xs={12} md={6}></Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default ResetPassword;

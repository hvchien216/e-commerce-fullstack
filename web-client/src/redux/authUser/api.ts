import { AxiosRequestConfig } from "axios";
import api from "../axiosClient";
import {
  IChangePassord,
  IForgotPassword,
  ILogin,
  IRegister,
  IResetPassword,
} from "./types";

const login = (data: ILogin & AxiosRequestConfig) => {
  const url = `/api/auth/login`;
  return api.post(url, data);
};

const register = (data: IRegister & AxiosRequestConfig) => {
  const url = `/api/auth/register`;
  return api.post(url, data);
};

const forgotPassword = (data: IForgotPassword & AxiosRequestConfig) => {
  const url = `/api/auth/forgot-password`;
  return api.post(url, data);
};

const resetPassword = (
  userId: string,
  token: string,
  data: IResetPassword & AxiosRequestConfig
) => {
  const url = `/api/auth/reset-password/${userId}/${token}`;
  return api.post(url, data);
};

const changePassoword = (data: IChangePassord & AxiosRequestConfig) => {
  const url = `/api/auth/change-pwd`;
  return api.put(url, data);
};

const getProfile = () => {
  const url = `/api/auth/profile`;
  return api.get(url);
};

const updateProfile = (data: any) => {
  const url = `/api/auth/profile`;
  return api.put(url, data);
};

const getMyOrderList = (params: {
  status?: string;
  limit?: string;
  page?: string;
}) => {
  const url = `/api/auth/my-order`;
  return api.get(url, { params });
};

const getMyOrderDetails = (orderId: string) => {
  const url = `/api/auth/my-order/${orderId}`;
  return api.get(url);
};

const paymentByCOD = (data: any) => {
  const url = `/api/payment/payment-by-cod`;
  return api.post(url, data);
};

const paymentByCreditCard = (data: any) => {
  const url = `/api/payment/payment-by-credit-card`;
  return api.post(url, data);
};

const upload = (data: any) => {
  const url = `/api/upload/single-image`;
  return api.post(url, data);
};

export default {
  login,
  register,
  forgotPassword,
  resetPassword,
  changePassoword,
  getProfile,
  updateProfile,
  getMyOrderList,
  getMyOrderDetails,
  paymentByCOD,
  paymentByCreditCard,
  upload,
};

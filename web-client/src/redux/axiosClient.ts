import axios from "axios";
import Cookies from "js-cookie";
import { resolve } from "node:path";
import queryString from "query-string";
import ServiceError from "@config/ServiceErrors";
import { AppState, SagaStore, store, wrapper } from "./store";
import { logout } from "./authUser/actions";
import { alertNotification } from "@utils/index";
// import store from './../redux/store';
// import { logoutUser } from './../redux/actions/userActions';
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  // const userStorage = localStorage.getItem('user');
  // const token = userStorage ? JSON.parse(userStorage).token : null;
  const token = Cookies.get("token");
  try {
    const parseToken = JSON.parse(token || "")?.token;
    if (parseToken) {
      config.headers["Authorization"] = "Bearer " + parseToken;
    }
  } catch (error) {}
  config.headers["Accept"] = "application/json";
  config.headers["Content-Type"] = "application/json";
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    // if (response?.data?.error_code === 'token_not_valid') {
    //   store.dispatch(logoutUser());
    // }
    // console.log("response====>", response);
    if (response?.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    console.log("wrapper===>", store);
    if (error.response?.data?.error_code === "token_invalid") {
      (store as SagaStore).dispatch(logout());
      alertNotification("Phiên đăng nhập hết hạn", "warning");
    }
    return new Promise((resolve, reject) => {
      reject(ServiceError.getServerError(error.response?.data));
    });
  }
);

export default axiosClient;

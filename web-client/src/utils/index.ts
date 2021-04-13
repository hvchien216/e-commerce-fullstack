import Cookies from "js-cookie";
import swal from "@sweetalert/with-react";
import { ORDER_STATUSES } from "@redux/product/types";
import find from "lodash/find";
export const formatCurrency = (n: number, currency: string = "₫"): string => {
  return n.toLocaleString() + currency;
};

export const formarDiscountPrice = (
  n: number,
  discount: number = 0
): number => {
  return discount ? Math.ceil(n - n * (discount / 100)) : n;
};

export const calculateDiscountPrice = (
  n: number,
  discount: number = 0
): number => {
  return discount ? Math.ceil(n - n * (discount / 100)) : n;
};

export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const storedToken = (token: string): void => {
  Cookies.set("token", token, { expires: 60 });
};

export const clearToken = (): void => {
  Cookies.remove("token");
};

export const storedInfoUser = (token: string): void => {
  Cookies.set("infoUser", token, { expires: 60 });
};

export const clearInfoUser = (): void => {
  Cookies.remove("infoUser");
};

export const clearLocalStored = (): void => {
  localStorage.removeItem("persist:nextjs");
};

export const removeBlankAttbObj = (obj: any) => {
  for (var propName in obj) {
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === ""
    ) {
      delete obj[propName];
    }
  }
  return obj;
};

export const alertNotification = (
  text: string,
  icon = "success",
  btn = "OK"
) => {
  let settings: any = {
    title: "Thông báo",
    text: text,
    icon: icon,
    buttons: btn,
    timer: 3000,
  };
  if (Array.isArray(btn)) {
    settings.dangerMode = true;
    settings.timer = false;
  }
  if (typeof text !== "string") {
    delete settings["text"];
    settings.content = text;
  }

  return swal(settings);
};

export const ORDER_TYPE_STATUSES = [
  { value: "", label: "Tất cả" },
  { value: ORDER_STATUSES.WAITING, label: "Chờ xác nhận", color: "#ffc107" },
  { value: ORDER_STATUSES.COMFIRMED, label: "Đã xác nhận", color: "#9c27b0" },
  { value: ORDER_STATUSES.SHIPPING, label: "Đang giao", color: "#03a9f4" },
  { value: ORDER_STATUSES.SUCCESS, label: "Thành công", color: "#76ff03" },
  { value: ORDER_STATUSES.RETURNS, label: "Trả hàng", color: "#b2102f" },
];

export const RENDER_ORDER_STATUS_TAG = (val: string) => {
  let curr = find(ORDER_TYPE_STATUSES, ({ value }) => value === val);
  if (curr) {
    return curr;
  }
  return null;
};

export const convertDateTime = (date: string): string => {
  let d = new Date(date);
  let result = "";
  try {
    result =
      [
        `0${d.getMonth() + 1}`.slice(-2),
        `0${d.getDate()}`.slice(-2),
        d.getFullYear(),
      ].join("/") +
      " " +
      [
        `0${d.getHours()}`.slice(-2),
        `0${d.getMinutes()}`.slice(-2),
        `0${d.getSeconds()}`.slice(-2),
      ].join(":");
  } catch (error) {}
  return result;
};

import Cookies from "js-cookie";

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

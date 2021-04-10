import { AxiosRequestConfig, AxiosResponse } from "axios";
import api from "../axiosClient";
import { Product } from "./types";

export interface ParamsGetProductList {
  limit?: number;
  page?: number;
  keyword?: string;
  sizes?: string;
  category?: string;
  brandIds?: string;
  from?: string;
  to?: string;
}

const getProductList = (params: ParamsGetProductList & AxiosRequestConfig) => {
  const url = `api/product`;
  return api.get(url, params);
};

const getNewProductList = () => {
  const url = `/api/product/new/list`;
  return api.get(url);
};

const getBestSellerProductList = () => {
  const url = `/api/product/best-seller/list`;
  return api.get(url);
};

const getCategoryList = () => {
  const url = `/api/category/options/filter`;
  return api.get(url);
};

const getProductDetail = (slug: string) => {
  const url = `/api/product/${slug}`;
  return api.get(url);
};

export default {
  getProductList,
  getNewProductList,
  getBestSellerProductList,
  getCategoryList,
  getProductDetail,
};

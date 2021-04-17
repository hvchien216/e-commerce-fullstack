import { AxiosRequestConfig, AxiosResponse } from "axios";
import api from "../axiosClient";
import { Product } from "./types";

export interface ParamsGetProductList {
  limit?: number;
  page?: number;
  keyword?: string;
  sizes?: string;
  category?: string;
  brands?: string;
  from?: string;
  to?: string;
}

const getProductList = (
  params: ParamsGetProductList & AxiosRequestConfig = {}
) => {
  const url = `api/product`;
  return api.get(url, { params });
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

const getBrandList = () => {
  const url = `/api/brand/options/filter`;
  return api.get(url);
};

const getVariantList = () => {
  const url = `/api/variant/options/filter`;
  return api.get(url);
};

const rateProduct = (data: { product_id: string; numRate: number }) => {
  const url = `/api/product/rate-product`;
  return api.put(url, data);
};

const getCommentListOfProd = (params: {
  page: number;
  limit: number;
  product_id: string;
}) => {
  const url = `/api/product/comment/list`;
  return api.get(url, { params });
};

const commentForProduct = (data: { content: string; product_id: string }) => {
  const url = `/api/product/comment-product`;
  return api.put(url, data);
};

export default {
  getProductList,
  getNewProductList,
  getBestSellerProductList,
  getCategoryList,
  getProductDetail,
  getBrandList,
  getVariantList,
  rateProduct,
  getCommentListOfProd,
  commentForProduct,
};

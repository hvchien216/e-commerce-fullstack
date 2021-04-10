import {
  DARKMODE,
  FetchNewProductListAction,
  FetchNewProductListSuccessAction,
  FetchProductAction,
  FetchProductFailAction,
  FetchProductSuccessAction,
  FETCH_NEW_PRODUCT_LIST,
  FETCH_NEW_PRODUCT_LIST_SUCCESS,
  FETCH_PRODUCT,
  FETCH_PRODUCT_FAIL,
  FETCH_PRODUCT_SUCCESS,
  Product,
  TOGGLE_DARKMODE,
} from "./types";

export const fetchProducts = (params: any): FetchProductAction => ({
  type: FETCH_PRODUCT,
  params,
});

export const fetchProductsSuccess = (
  data: Product[]
): FetchProductSuccessAction => ({
  type: FETCH_PRODUCT_SUCCESS,
  data: {
    products: data,
  },
});

export const fetchProductsFail = (error: string): FetchProductFailAction => ({
  type: FETCH_PRODUCT_FAIL,
  error,
});

export const toggleDarkMode = (): DARKMODE => ({
  type: TOGGLE_DARKMODE,
});

export const fetchNewProductList = (): FetchNewProductListAction => ({
  type: FETCH_NEW_PRODUCT_LIST,
});

export const fetchNewProductSuccessList = (
  data: Product[]
): FetchNewProductListSuccessAction => ({
  type: FETCH_NEW_PRODUCT_LIST_SUCCESS,
  data,
});

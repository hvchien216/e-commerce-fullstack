export interface ObjectImageProduct {
  url: string;
  primary: boolean;
}

export interface Variant {
  variant: {
    name: string;
  };
  unit_price: number;
  discount_rate: number;
  inStock: number;
  saled: number;
}

export interface Brand {
  _id: string;
  name: string;
}

export interface Product {
  _id: string;
  name: string;
  images: ObjectImageProduct[];
  code: string;
  slug_name: string;
  description: string;
  brand_id: Brand;
  category_id: string;
  variants: Variant[];
}

export const FETCH_PRODUCT = "FETCH_PRODUCT";
export const FETCH_PRODUCT_SUCCESS = "FETCH_PRODUCT_SUCCESS";
export const FETCH_PRODUCT_FAIL = "FETCH_PRODUCT_FAIL";
export const TOGGLE_DARKMODE = "TOGGLE_DARKMODE";
export const FETCH_NEW_PRODUCT_LIST = "FETCH_NEW_PRODUCT_LIST";
export const FETCH_NEW_PRODUCT_LIST_SUCCESS = "FETCH_NEW_PRODUCT_LIST_SUCCESS";

export interface DARKMODE {
  type: typeof TOGGLE_DARKMODE;
}
export interface FetchProductAction {
  type: typeof FETCH_PRODUCT;
  params: any;
}

export interface FetchProductSuccessAction {
  type: typeof FETCH_PRODUCT_SUCCESS;
  data: {
    products: Product[];
  };
}

export interface FetchProductFailAction {
  type: typeof FETCH_PRODUCT_FAIL;
  error: string;
}

export interface FetchNewProductListAction {
  type: typeof FETCH_NEW_PRODUCT_LIST;
}

export interface FetchNewProductListSuccessAction {
  type: typeof FETCH_NEW_PRODUCT_LIST_SUCCESS;
  data: Product[];
}

export type ProductActionTypes =
  | FetchProductAction
  | FetchProductSuccessAction
  | FetchProductFailAction
  | FetchNewProductListAction
  | FetchNewProductListSuccessAction
  | DARKMODE;

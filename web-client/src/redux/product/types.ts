export interface ObjectImageProduct {
  url: string;
  primary: boolean;
}

export interface Variant {
  variant: {
    _id: string;
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

export interface Category {
  _id: string;
}

export interface Comment {
  _id: string;
  user_id: any;
  content: string;
  createdOn: Date;
}
export interface CommentHaveReply extends Comment {
  reply: Comment[];
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
  rate: number;
  numOfUserRate: number;
  comment: CommentHaveReply[];
}

export enum ORDER_STATUSES {
  "WAITING" = "WAITING",
  "COMFIRMED" = "COMFIRMED",
  "SHIPPING" = "SHIPPING",
  "SUCCESS" = "SUCCESS",
  "RETURNS" = "RETURNS",
}

export interface Order {
  _id: string;
  status: ORDER_STATUSES;
  user: string;
  receiver_name: string;
  note: string | undefined;
  address: string;
  phone: string;
  paymentMethod: string;
  totalAmount: number;
  detais: {
    _id: string;
    product_id: Product;
    price: number;
    quantity: number;
    variant: string;
    total: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
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

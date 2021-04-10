export interface PayloadRemoveItemFromCart {
  product_id: string;
  variant: string;
}

export interface PayloadUpdateItemFromCart extends PayloadRemoveItemFromCart {
  quantity: number;
}

export interface CartItem {
  product_id: string;
  name: string;
  slug_name: string;
  variant: string;
  quantity: number;
  inStock: number;
  price: number;
  total?: number;
  image: string;
}

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_CART_ITEM = "UPDATE_CART_ITEM";
export const REMOVE_ALL_CART = "REMOVE_ALL_CART";

export interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: any;
}

export interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  payload: PayloadRemoveItemFromCart;
}

export interface UpdateCartItemAction {
  type: typeof UPDATE_CART_ITEM;
  payload: any;
}

export interface RemoveAllCartAction {
  type: typeof REMOVE_ALL_CART;
}

export type CartActionTypes =
  | AddToCartAction
  | RemoveFromCartAction
  | UpdateCartItemAction
  | RemoveAllCartAction;

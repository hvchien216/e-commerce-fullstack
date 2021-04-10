import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM,
  REMOVE_ALL_CART,
  AddToCartAction,
  RemoveFromCartAction,
  UpdateCartItemAction,
  RemoveAllCartAction,
  PayloadRemoveItemFromCart,
  PayloadUpdateItemFromCart,
  CartItem,
} from "./types";

export const addToCart = (payload: CartItem): AddToCartAction => ({
  type: ADD_TO_CART,
  payload,
});

export const removeItemFromCart = (
  payload: PayloadRemoveItemFromCart
): RemoveFromCartAction => ({
  type: REMOVE_FROM_CART,
  payload,
});

export const changeQuantityItemCart = (
  payload: PayloadUpdateItemFromCart
): UpdateCartItemAction => ({
  type: UPDATE_CART_ITEM,
  payload,
});

export const removeAllItemCart = (): RemoveAllCartAction => ({
  type: REMOVE_ALL_CART,
});

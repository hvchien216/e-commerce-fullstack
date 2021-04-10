import produce from "immer";
import { AnyAction } from "redux";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM,
  REMOVE_ALL_CART,
  CartItem,
} from "./types";

interface CartState {
  myCart: CartItem[];
}

const initialState: CartState = {
  myCart: [],
};

const productReducer = (state = initialState, action: AnyAction) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_TO_CART:
        const indexOfProduct = draft.myCart.findIndex((ele: any) => {
          return (
            ele.product_id === action.payload.product_id &&
            ele.variant === action.payload.variant
          );
        });
        if (indexOfProduct >= 0) {
          const newCartState = [...draft.myCart];
          //copy mang state cart trong store
          newCartState[indexOfProduct].quantity =
            Number(newCartState[indexOfProduct].quantity) +
            Number(action.payload.quantity);
          // savedYourCard(newCartState)
          draft.myCart = newCartState;
        } else {
          // savedYourCard([...state.cart, action.payload]);
          draft.myCart = [...draft.myCart, action.payload];
        }
        return;
      case REMOVE_FROM_CART: {
        const indexOfProduct = [...draft.myCart].findIndex((ele) => {
          return (
            ele.product_id === action.payload.product_id &&
            ele.variant === action.payload.variant
          );
        });
        if (indexOfProduct !== -1) {
          const newList = [
            ...draft.myCart.slice(0, indexOfProduct),
            ...draft.myCart.slice(indexOfProduct + 1),
          ];
          // savedYourCard(newList);
          draft.myCart = newList;

          return;
        }
      }
      case UPDATE_CART_ITEM: {
        const newCartState = [...draft.myCart];
        const indexOfProduct = draft.myCart.findIndex((ele: CartItem) => {
          return (
            ele.product_id === action.payload.product_id &&
            ele.variant === action.payload.variant
          );
        });

        newCartState[indexOfProduct].quantity = action.payload.quantity;
        if (newCartState[indexOfProduct].quantity === 0) {
          const newCart = newCartState.filter((item) => {
            return !(
              item.product_id === action.payload.product_id &&
              item.variant === action.payload.variant
            );
          });
          // savedYourCard(newCart);
          draft.myCart = newCart;

          return;
        }

        // savedYourCard(newCartState);
        draft.myCart = newCartState;

        return;
      }
      case REMOVE_ALL_CART: {
        draft.myCart = [];
        return;
      }
    }
  });
};

export default productReducer;

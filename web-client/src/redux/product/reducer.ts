import produce from "immer";
import { AnyAction } from "redux";
import {
  FETCH_NEW_PRODUCT_LIST_SUCCESS,
  FETCH_PRODUCT,
  FETCH_PRODUCT_FAIL,
  FETCH_PRODUCT_SUCCESS,
  Product,
  ProductActionTypes,
  TOGGLE_DARKMODE,
} from "./types";

interface ProductState {
  products: Product[];
  newProductList: Product[];
  loading: boolean;
  page: number;
  limit: number;
  darkMode: boolean;
}

const initialState: ProductState = {
  newProductList: [],
  products: [],
  loading: false,
  page: 1,
  limit: 10,
  darkMode: false,
};

const productReducer = (state = initialState, action: AnyAction) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case FETCH_PRODUCT:
        draft.loading = true;
        return;
      case TOGGLE_DARKMODE:
        draft.darkMode = !draft.darkMode;
        return;
      case FETCH_PRODUCT_SUCCESS:
        draft.products = action.layload.data.products;
        draft.loading = false;
        return;
      case FETCH_NEW_PRODUCT_LIST_SUCCESS:
        draft.newProductList = action.data;
        return;
      case FETCH_PRODUCT_FAIL:
        draft.loading = false;
    }
  });
};

export default productReducer;

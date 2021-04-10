import { combineReducers } from "redux";
import products from "./product/reducer";
import cart from "./cart/reducer";
import authUser from "./authUser/reducer";
const rootReducer = combineReducers({
  products,
  cart,
  authUser,
});

export default rootReducer;

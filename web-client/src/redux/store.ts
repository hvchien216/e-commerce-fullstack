import { AnyAction, applyMiddleware, createStore, Store } from "redux";
import createSagaMiddleware, { END, Task } from "redux-saga";
import rootReducer from "./rootReducers";
import rootSaga from "./rootSagas";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { ProductActionTypes } from "./product/types";
import { CartActionTypes } from "./cart/types";
import { AuthUserActionTypes } from "./authUser/types";
export type AppState = ReturnType<typeof rootReducer>;
export type AppActions =
  | ProductActionTypes
  | CartActionTypes
  | AuthUserActionTypes
  | END;
export interface SagaStore extends Store<AppState, AppActions> {
  sagaTask: Task;
}

const reducer: any = (state: AppState, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      products: action.payload?.products, // apply delta from hydration
    };
    // if (state.products.newProductList.length > 0) nextState.products.newProductList = state.products.newProductList // preserve count value on client side navigation
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

function configureStore({ isServer }: any) {
  const sagaMiddleware = createSagaMiddleware();
  if (isServer) {
    //If it's on server side, create a store
    return createStore(reducer, bindMiddleware([sagaMiddleware]));
  } else {
    const { persistStore, persistReducer } = require("redux-persist");
    const storage = require("redux-persist/lib/storage").default;

    const persistConfig = {
      key: "nextjs",
      whitelist: ["cart", "authUser"], // only counter will be persisted, add other reducers if needed
      storage, // if needed, use a safer storage
    };

    const persistedReducer = persistReducer(persistConfig, reducer);

    const store: Store<AppState, AppActions> = createStore(
      persistedReducer,
      bindMiddleware([sagaMiddleware])
    );
    (store as any).__persistor = persistStore(store);
    (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga); // tslint:disable-line

    return store;
  }
}

export const store = configureStore(false);

export const wrapper = createWrapper(configureStore as any);

import {
  call,
  put,
  SagaReturnType,
  take,
  takeLatest,
} from "redux-saga/effects";
import {
  fetchNewProductSuccessList,
  fetchProductsFail,
  fetchProductsSuccess,
} from "./actions";
import apiProduct from "./api";
import {
  FetchNewProductListAction,
  FetchProductAction,
  FETCH_NEW_PRODUCT_LIST,
  FETCH_PRODUCT,
  Product,
} from "./types";

/**
 * saga fetch product list
 */

type ResponseGetProductList = SagaReturnType<typeof apiProduct.getProductList>;

export function* fetchProducts({ params }: FetchProductAction): any {
  try {
    const { data }: ResponseGetProductList = yield call(
      apiProduct.getProductList,
      params
    );
    yield put(fetchProductsSuccess(data));
  } catch (err) {
    yield put(fetchProductsFail(err));
  }
}

/**
 * saga fetch product list
 */

type ResponseGetNewProductList = SagaReturnType<
  typeof apiProduct.getNewProductList
>;
export function* fetchNewProductList(action: FetchNewProductListAction): any {
  try {
    const data: any = yield call(apiProduct.getNewProductList);
    // console.log("products===>", data);
    yield put(fetchNewProductSuccessList(data.products));
  } catch (err) {
    yield put(fetchProductsFail(err));
    console.log(err);
  }
}

const sagas = [
  takeLatest(FETCH_PRODUCT, fetchProducts),
  takeLatest(FETCH_NEW_PRODUCT_LIST, fetchNewProductList),
];

export default sagas;

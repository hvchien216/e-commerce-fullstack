import { call, delay, put, takeLatest } from "@redux-saga/core/effects";
import { GET_PROFILE, LOGIN } from "./types";
import apiAuth from "./api";
import { getProfileFail, getProfileSuccess } from "./actions";
// /**
//  * saga fetch product list
//  */

// type ResponseGetProductList = SagaReturnType<typeof apiProduct.getProductList>;

// export function* fetchProducts({ params }: FetchProductAction): any {
//   try {
//     const { data }: ResponseGetProductList = yield call(
//       apiProduct.getProductList,
//       params
//     );
//     yield put(fetchProductsSuccess(data));
//   } catch (err) {
//     yield put(fetchProductsFail(err));
//   }
// }

// /**
//  * saga fetch product list
//  */

// type ResponseGetNewProductList = SagaReturnType<
//   typeof apiProduct.getNewProductList
// >;
export function* getProfileSaga(action: any): any {
  try {
    const profile: any = yield call(apiAuth.getProfile);
    if (profile) {
      yield put(getProfileSuccess(profile));
      if (action?.isTriggerFunc) {
        action?.func();
      }
    } else {
      yield put(getProfileFail());
    }
  } catch (err) {
    yield put(getProfileFail());
    console.log(err);
  }
}

const sagas = [
  takeLatest(GET_PROFILE, getProfileSaga),
  // takeLatest(FETCH_NEW_PRODUCT_LIST, fetchNewProductList),
];

// export default sagas;

// const sagas: any = [];
export default sagas;

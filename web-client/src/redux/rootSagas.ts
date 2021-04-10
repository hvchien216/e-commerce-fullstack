import { all } from "redux-saga/effects";

// import userDataSagas from "./UserData/sagas";
import productSaga from "./product/sagas";
import authUserSaga from "./authUser/sagas";

function* rootSaga() {
  yield all([...productSaga, ...authUserSaga]);
}

export default rootSaga;

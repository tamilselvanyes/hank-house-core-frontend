import { API_URLS } from "../../../constant/index";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { request } from "../../../service/request/index";
import { appContainerActions as actions } from "./index";

export function* pingTest(data: any) {
  try {
    console.log(API_URLS, "Called api");
    let responseData: string = yield call(request, `${API_URLS}`, {
      method: "get",
    });

    if (responseData.length > 0) {
    }
  } catch (error) {
    console.log(error);
  }
}

export function* appContainerSaga() {
  yield takeLatest(actions.pingTest, pingTest);
  yield takeLatest(actions.getProduct, pingTest);
}

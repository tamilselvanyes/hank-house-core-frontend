import { API_URLS } from "../../../constant/index";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { request } from "../../../service/request/index";
import { appContainerActions as actions } from "./index";
import { useCookies } from "react-cookie";

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

export function* getWishList(data: any) {
  try {
    let responseData: any[] = yield call(
      request,
      `${API_URLS}/wishlist?userId=${data.payload}`,
      {
        method: "get",
      }
    );
    yield put(actions.setWishlist(responseData));
  } catch (error) {
    console.log(error);
  }
}

export function* createWishlist(data: any) {
  console.log(data, "Data @ create==>");

  try {
    let responseData: string = yield call(request, `${API_URLS}/wishlist`, {
      method: "post",
      body: JSON.stringify(data.payload),
    });

    yield put(actions.getWishList(data.payload.userId));
  } catch (error) {
    console.log(error);
  }
}

export function* removeWishlist(data: any) {
  const payload = data.payload;

  try {
    let responseData: string = yield call(
      request,
      `${API_URLS}/wishlist/${payload.wishlistId}`,
      {
        method: "delete",
      }
    );
    yield put(actions.getWishList(payload.userId));
  } catch (error) {
    console.log(error);
  }
}

export function* appContainerSaga() {
  yield takeLatest(actions.pingTest, pingTest);
  yield takeLatest(actions.getProduct, pingTest);
  yield takeLatest(actions.getWishList, getWishList);
  yield takeLatest(actions.createWishlist, createWishlist);
  yield takeLatest(actions.removeWishList, removeWishlist);
}

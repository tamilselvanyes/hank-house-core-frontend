import { API_URLS } from '../../../constant/index';
import {
  call,
  put,
  select,
  take,
  takeLatest,
} from 'redux-saga/effects';
import { request } from '../../../service/request/index';
import { appContainerActions as actions } from './index';
import { useCookies } from 'react-cookie';
import { Product } from '../../Products/Model';

export function* pingTest(data: any) {
  try {
    console.log(API_URLS, 'Called api');
    let responseData: string = yield call(request, `${API_URLS}`, {
      method: 'get',
    });

    if (responseData.length > 0) {
    }
  } catch (error) {
    console.log(error);
  }
}

export function* getProduct() {
  try {
    let responseData: Product[] = yield call(
      request,
      `${API_URLS}/product/`,
      { method: 'get' }
    );
    yield put(actions.setProduct(responseData));
  } catch (error) {}
}

export function* getWishList(data: any) {
  try {
    let responseData: any[] = yield call(
      request,
      `${API_URLS}/wishlist?userId=${data.payload}`,
      {
        method: 'get',
      }
    );
    yield put(actions.setWishlist(responseData));
  } catch (error) {
    console.log(error);
  }
}

export function* createWishlist(data: any) {
  try {
    let responseData: string = yield call(
      request,
      `${API_URLS}/wishlist`,
      {
        method: 'post',
        body: JSON.stringify(data.payload),
      }
    );

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
        method: 'delete',
      }
    );
    yield put(actions.getWishList(payload.userId));
  } catch (error) {
    console.log(error);
  }
}

export function* getCartItem(data: any) {
  try {
    let responseData: any[] = yield call(
      request,
      `${API_URLS}/cart?userId=${data.payload}`,
      {
        method: 'get',
      }
    );
    yield put(actions.setCartItem(responseData));
  } catch (error) {
    console.log(error);
  }
}

export function* createCartItem(data: any) {
  const payload = data.payload;
  try {
    let responseData: string = yield call(
      request,
      `${API_URLS}/cart`,
      {
        method: 'post',
        body: JSON.stringify(data.payload),
      }
    );

    yield put(actions.getCartItem(data.payload.userId));
  } catch (error) {
    console.log(error);
  }
}

export function* removeCartItem(data: any) {
  const payload = data.payload;
  console.log('=======>', data);
  try {
    let responseData: string = yield call(
      request,
      `${API_URLS}/cart/${payload.cartId}`,
      {
        method: 'delete',
      }
    );
    yield put(actions.getCartItem(payload.userId));
  } catch (error) {
    console.log(error);
  }
}

export function* getReviews(data: any) {
  try {
    let responseData: any[] = yield call(
      request,
      `${API_URLS}/review/?productId=${data.payload}`,
      {
        method: 'get',
      }
    );
    yield put(actions.setReviews(responseData));
  } catch (error) {
    console.log(error);
  }
}

export function* addNewReview(data: any) {
  const payload = data.payload;
  console.log('=====>add review', payload);
  try {
    let responseData: string = yield call(
      request,
      `${API_URLS}/review/`,
      {
        method: 'post',
        body: JSON.stringify(payload),
      }
    );

    yield put(actions.getReviews(data.payload.productId));
  } catch (error) {
    console.log(error);
  }
}

export function* appContainerSaga() {
  yield takeLatest(actions.pingTest, pingTest);
  yield takeLatest(actions.getProduct, getProduct);
  yield takeLatest(actions.getWishList, getWishList);
  yield takeLatest(actions.createWishlist, createWishlist);
  yield takeLatest(actions.removeWishList, removeWishlist);
  yield takeLatest(actions.getCartItem, getCartItem);
  yield takeLatest(actions.createCartItem, createCartItem);
  yield takeLatest(actions.removeCartItem, removeCartItem);
  yield takeLatest(actions.getReviews, getReviews);
  yield takeLatest(actions.addnewreview, addNewReview);
}

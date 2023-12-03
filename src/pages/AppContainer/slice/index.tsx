import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '../../../store/toolkit';
import {
  useInjectReducer,
  useInjectSaga,
} from '../../../store/reducer-injectors';

import { appContainerSaga } from './saga';
import {
  AddressType,
  AppContainerStates,
  cartDeletion,
  cartItemCreation,
  wishlistCreation,
  wishlistDeletion,
} from './types';
import { ReviewModel } from '../../Products/Model';

export const initialState: AppContainerStates = {
  pingResponse: '',
  productLoading: false,
  productList: [],
  wishlistLoading: false,
  wishList: [],
  cartLoading: false,
  cart: [],
  reviewLoading: false,
  reviews: [],
  addressLoading: false,
  address: [],
  signInLoading: false,
  userData: {},
};
const slice = createSlice({
  name: 'appContainer',
  initialState,
  reducers: {
    pingTest(
      state: AppContainerStates,
      action: PayloadAction<string>
    ) {
      console.log(action.payload, 'TEST PAYLOAD');
    },
    pingTestSuccessful(state: any, action: PayloadAction<any>) {
      state.pingResponse = JSON.stringify(action.payload);
    },
    getProduct(state: AppContainerStates) {
      state.productLoading = true;
    },
    setProduct(
      state: AppContainerStates,
      action: PayloadAction<any[]>
    ) {
      state.productList = action.payload;
    },
    getWishList(
      state: AppContainerStates,
      action: PayloadAction<string>
    ) {
      state.wishlistLoading = true;
    },
    setWishlist(
      state: AppContainerStates,
      action: PayloadAction<any[]>
    ) {
      state.wishList = action.payload;
    },
    createWishlist(
      state: AppContainerStates,
      action: PayloadAction<wishlistCreation>
    ) {
      state.wishlistLoading = true;
    },
    removeWishList(
      state: AppContainerStates,
      action: PayloadAction<wishlistDeletion>
    ) {
      state.wishlistLoading = true;
    },
    setCartItem(
      state: AppContainerStates,
      action: PayloadAction<any[]>
    ) {
      state.cart = action.payload;
    },
    getCartItem(
      state: AppContainerStates,
      action: PayloadAction<string>
    ) {
      state.cartLoading = true;
    },
    updateCartItemQuantity(
      state: AppContainerStates,
      action: PayloadAction<any>
    ){
      state.cartLoading=true;
    },
    createCartItem(
      state: AppContainerStates,
      action: PayloadAction<cartItemCreation>
    ) {
      state.cartLoading = true;
    },
    removeCartItem(
      state: AppContainerStates,
      action: PayloadAction<cartDeletion>
    ) {
      state.cartLoading = true;
    },
    setReviews(
      state: AppContainerStates,
      action: PayloadAction<any[]>
    ) {
      state.reviews = action.payload;
    },
    getReviews(
      state: AppContainerStates,
      action: PayloadAction<any>
    ) {
      state.reviewLoading = true;
    },
    addnewreview(
      state: AppContainerStates,
      action: PayloadAction<ReviewModel>
    ) {
      state.reviewLoading = true;
    },
    setAddress(
      state: AppContainerStates,
      action: PayloadAction<any>
    ) {
      state.address = action.payload;
    },
    getAddress(
      state: AppContainerStates,
      action: PayloadAction<any>
    ) {
      state.addressLoading = true;
    },
    addNewAddress(
      state: AppContainerStates,
      action: PayloadAction<any>
    ) {
      state.addressLoading = true;
    },
    updateAddress(
      state: AppContainerStates,
      action: PayloadAction<any>
    ) {
      state.addressLoading = true;
    },
    signIn(state: AppContainerStates, action: PayloadAction<any>) {
      state.userData = action.payload;
    },
    setUserData(
      state: AppContainerStates,
      action: PayloadAction<any>
    ) {
      state.userData = action.payload;
    },
  },
});

export const { actions: appContainerActions } = slice;
export const useAppContainerSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: appContainerSaga });
  return { appContainerActions: slice.actions };
};

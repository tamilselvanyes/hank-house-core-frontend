import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "../../../store/toolkit";
import {
  useInjectReducer,
  useInjectSaga,
} from "../../../store/reducer-injectors";

import { appContainerSaga } from "./saga";
import { AppContainerStates } from "./types";

export const initialState: AppContainerStates = {
  pingResponse: "",
  productLoading: false,
  productList: [],
};
const slice = createSlice({
  name: "appContainer",
  initialState,
  reducers: {
    pingTest(state: AppContainerStates, action: PayloadAction<string>) {
      console.log(action.payload, "TEST PAYLOAD");
    },
    pingTestSuccessful(state: any, action: PayloadAction<any>) {
      state.pingResponse = JSON.stringify(action.payload);
    },
    getProduct(state: AppContainerStates) {
      state.productLoading = true;
    },
    setProduct(state: AppContainerStates, action: PayloadAction<any[]>) {
      state.productList = action.payload;
    },
  },
});

export const { actions: appContainerActions } = slice;
export const useAppContainerSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: appContainerSaga });
  return { appContainerActions: slice.actions };
};

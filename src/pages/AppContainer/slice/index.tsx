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
};
const slice = createSlice({
  name: "appContainer",
  initialState,
  reducers: {
    pingTest(state: any, action: PayloadAction<string>) {
      console.log(action.payload, "TEST PAYLOAD");
    },
    pingTestSuccessful(state: any, action: PayloadAction<any>) {
      state.pingResponse = JSON.stringify(action.payload);
    },
  },
});

export const { actions: appContainerActions } = slice;
export const useAppContainerSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: appContainerSaga });
  return { appContainerActions: slice.actions };
};

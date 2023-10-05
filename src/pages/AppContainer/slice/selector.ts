import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/types";
import { initialState } from ".";
export const selectSlice = (state: RootState) =>
  state.appContainer || initialState;
export const selectAppContainerState = createSelector(
  [selectSlice],
  (state) => state
);

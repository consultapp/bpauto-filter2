import { RootState } from "..";

export const uiSelector = (state: RootState) => state.ui;

export const uiTabSelector = (state: RootState) =>
  uiSelector(state).selectedTabIndex;

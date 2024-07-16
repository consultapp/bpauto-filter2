import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  selectedTabIndex: number;
}

const initialState: CounterState = {
  selectedTabIndex: 2,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTab: (state, { payload }) => {
      state.selectedTabIndex = parseInt(payload) || 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTab } = uiSlice.actions;

import { CAR_TAB_STATES } from "@/fixtures/consts";
import { createSlice } from "@reduxjs/toolkit";

export const META_NAMES = [
  "brandSectionCode",
  "modelSectionCode",
  "genSectionCode",
];

const startSectionCodes = META_NAMES.map((name) => {
  return (document.getElementById(name) as HTMLMetaElement)?.name ?? "";
});

export interface CounterState {
  selectedTabIndex: number;
  selectedBrand: string;
  selectedModel: string;
  selectedGeneration: string;
  carTabState: keyof typeof CAR_TAB_STATES;
}

const initialState: CounterState = {
  selectedTabIndex: 0,

  selectedBrand: startSectionCodes[0] ?? null,
  selectedModel: startSectionCodes[1] ?? null,
  selectedGeneration: startSectionCodes[2] ?? null,

  carTabState: CAR_TAB_STATES.allClosed,
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

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
  startSectionCodes: string[];
  selectedTabIndex: number;
  selectedBrandId: string;
  selectedModelId: string;
  selectedGenerationId: string;

  filter: string;
  carTabState: keyof typeof CAR_TAB_STATES;
}

const initialState: CounterState = {
  selectedTabIndex: 0,
  startSectionCodes,
  selectedBrandId: "",
  selectedModelId: "",
  selectedGenerationId: "",

  filter: "",
  carTabState: CAR_TAB_STATES.allClosed,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTab: (state, { payload }) => {
      state.selectedTabIndex = parseInt(payload) || 0;
      state.carTabState = CAR_TAB_STATES.allClosed;
    },
    setBrandId: (state, { payload }) => {
      state.selectedBrandId = payload || "";
    },
    setModelId: (state, { payload }) => {
      state.selectedModelId = payload || "";
    },
    setGenerationId: (state, { payload }) => {
      state.selectedGenerationId = payload || "";
    },
    setCarTabState: (state, { payload }) => {
      if (payload !== CAR_TAB_STATES.allClosed) state.filter = "";

      state.carTabState = payload || CAR_TAB_STATES.allClosed;
    },
    setFilter: (state, { payload }) => {
      state.filter = payload;
    },
    resetStartData: (state, { payload }) => {
      state.startSectionCodes = payload;
    },
  },
});

export const {
  setTab,
  setBrandId,
  setModelId,
  setGenerationId,
  setCarTabState,
  setFilter,
  resetStartData,
} = uiSlice.actions;

import { RootState } from "..";

export const uiSelector = (state: RootState) => state.ui;

export const uiTabSelector = (state: RootState) =>
  uiSelector(state).selectedTabIndex;

export const uiBrandIdSelector = (state: RootState) =>
  uiSelector(state).selectedBrandId;

export const uiModelIdSelector = (state: RootState) =>
  uiSelector(state).selectedModelId;

export const uiGenerationIdSelector = (state: RootState) =>
  uiSelector(state).selectedGenerationId;

export const startSectionCodesSelector = (state: RootState) =>
  uiSelector(state).startSectionCodes;

export const uiCarTabStateSelector = (state: RootState) =>
  uiSelector(state).carTabState;

export const uiFilterSelector = (state: RootState) => uiSelector(state).filter;

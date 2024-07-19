import { useDispatch, useSelector } from "react-redux";
import { uiTabSelector } from "./selectors";
import {
  setBrandId,
  setCarTabState,
  setFilter,
  setGenerationId,
  setModelId,
  setTab,
} from "./uiSlice";
import { CAR_TAB_STATES } from "@/fixtures/consts";

export const useTab = () => useSelector(uiTabSelector);

export const useSetTab = () => {
  const dispatch = useDispatch();
  return (tabIndex: number) => dispatch(setTab(tabIndex));
};

export const useSetBrand = () => {
  const dispatch = useDispatch();
  return (id: string) => dispatch(setBrandId(id));
};

export const useSetModel = () => {
  const dispatch = useDispatch();
  return (id: string) => dispatch(setModelId(id));
};

export const useSetGeneration = () => {
  const dispatch = useDispatch();
  return (id: string) => dispatch(setGenerationId(id));
};

export const useSetCarTabState = () => {
  const dispatch = useDispatch();
  return (t: string) => dispatch(setCarTabState(t));
};

export const useSetFilter = () => {
  const dispatch = useDispatch();
  return (t: string) => dispatch(setFilter(t));
};

export const useSelectCar = () => {
  const dispatch = useDispatch();
  return ({
    brandId,
    modelId,
    generationId,
  }: {
    brandId?: string;
    modelId?: string;
    generationId?: string;
  }) => {
    let tab = String(CAR_TAB_STATES.allClosed);
    if (brandId) {
      dispatch(setBrandId(brandId));
      tab = CAR_TAB_STATES.model;
    }
    if (modelId) {
      dispatch(setModelId(modelId));
      tab = CAR_TAB_STATES.generation;
    }
    if (generationId) {
      dispatch(setGenerationId(generationId));
      tab = CAR_TAB_STATES.allClosed;
    }

    dispatch(setCarTabState(tab));
  };
};

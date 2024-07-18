import { useDispatch, useSelector } from "react-redux";
import { uiTabSelector } from "./selectors";
import {
  resetStartData,
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

export const useResetStartData = () => {
  const dispatch = useDispatch();
  return (t: string[]) => dispatch(resetStartData(t));
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
    console.log("first", brandId, modelId, generationId);
    let tab = String(CAR_TAB_STATES.allClosed);
    if (brandId) {
      dispatch(setBrandId(brandId));
      console.log("second");

      tab = CAR_TAB_STATES.model;
    }
    if (modelId) {
      dispatch(setModelId(modelId));
      console.log("third");

      tab = CAR_TAB_STATES.generation;
    }
    if (generationId) {
      dispatch(setModelId(generationId));
      console.log("fours");

      tab = CAR_TAB_STATES.allClosed;
    }

    dispatch(setCarTabState(tab));
  };
};

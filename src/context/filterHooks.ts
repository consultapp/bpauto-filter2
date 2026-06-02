import { useContext } from "react";
import { FilterContext } from "./filterContext";

export function useFilter() {
  const ctx = useContext(FilterContext);
  if (!ctx) {
    throw new Error("useFilter must be used within FilterProvider");
  }
  return ctx;
}

export const useTab = () => useFilter().selectedTabIndex;
export const useSetTab = () => useFilter().setTab;
export const useSetBrand = () => useFilter().setBrandId;
export const useSetModel = () => useFilter().setModelId;
export const useSetGeneration = () => useFilter().setGenerationId;
export const useSetCarTabState = () => useFilter().setCarTabState;
export const useSetFilter = () => useFilter().setFilter;
export const useSelectCar = () => useFilter().selectCar;

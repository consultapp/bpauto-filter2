import { CAR_TAB_STATES } from "@/fixtures/consts";
import { useCallback, useMemo, useState, type ReactNode } from "react";
import {
  FilterContext,
  initialFilterState,
  type FilterContextValue,
  type FilterState,
} from "./filterContext";

export function FilterProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FilterState>(initialFilterState);

  const setTab = useCallback((tabIndex: number) => {
    localStorage.setItem("storedTabIndex", String(tabIndex));
    setState((prev) => ({
      ...prev,
      selectedTabIndex: tabIndex,
      carTabState: CAR_TAB_STATES.allClosed,
    }));
  }, []);

  const setBrandId = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      selectedBrandId: id || "",
      selectedModelId: "",
      selectedGenerationId: "",
    }));
  }, []);

  const setModelId = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      selectedModelId: id || "",
      selectedGenerationId: "",
    }));
  }, []);

  const setGenerationId = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      selectedGenerationId: id || "",
    }));
  }, []);

  const setCarTabState = useCallback((tabState: string) => {
    setState((prev) => ({
      ...prev,
      carTabState:
        (tabState as FilterState["carTabState"]) || CAR_TAB_STATES.allClosed,
      filter:
        tabState !== CAR_TAB_STATES.allClosed ? "" : prev.filter,
    }));
  }, []);

  const setFilter = useCallback((value: string) => {
    setState((prev) => ({ ...prev, filter: value }));
  }, []);

  const selectCar = useCallback(
    ({
      brandId,
      modelId,
      generationId,
    }: {
      brandId?: string;
      modelId?: string;
      generationId?: string;
    }) => {
      setState((prev) => {
        let carTabState: FilterState["carTabState"] = CAR_TAB_STATES.allClosed;
        const next = { ...prev };

        if (brandId) {
          next.selectedBrandId = brandId;
          next.selectedModelId = "";
          next.selectedGenerationId = "";
          carTabState = CAR_TAB_STATES.model;
        }
        if (modelId) {
          next.selectedModelId = modelId;
          next.selectedGenerationId = "";
          carTabState = CAR_TAB_STATES.generation;
        }
        if (generationId) {
          next.selectedGenerationId = generationId;
          carTabState = CAR_TAB_STATES.allClosed;
        }

        next.carTabState = carTabState;
        return next;
      });
    },
    []
  );

  const value = useMemo<FilterContextValue>(
    () => ({
      ...state,
      setTab,
      setBrandId,
      setModelId,
      setGenerationId,
      setCarTabState,
      setFilter,
      selectCar,
    }),
    [
      state,
      setTab,
      setBrandId,
      setModelId,
      setGenerationId,
      setCarTabState,
      setFilter,
      selectCar,
    ]
  );

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

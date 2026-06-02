import { CAR_TAB_STATES } from "@/fixtures/consts";
import { createContext } from "react";

export type FilterState = {
  selectedTabIndex: number;
  selectedBrandId: string;
  selectedModelId: string;
  selectedGenerationId: string;
  filter: string;
  carTabState: (typeof CAR_TAB_STATES)[keyof typeof CAR_TAB_STATES];
};

export type FilterContextValue = FilterState & {
  setTab: (tabIndex: number) => void;
  setBrandId: (id: string) => void;
  setModelId: (id: string) => void;
  setGenerationId: (id: string) => void;
  setCarTabState: (state: string) => void;
  setFilter: (value: string) => void;
  selectCar: (ids: {
    brandId?: string;
    modelId?: string;
    generationId?: string;
  }) => void;
};

export const FilterContext = createContext<FilterContextValue | null>(null);

const storedTabIndex = localStorage.getItem("storedTabIndex");

export const initialFilterState: FilterState = {
  selectedTabIndex: parseInt(storedTabIndex ?? "0", 10),
  selectedBrandId: "",
  selectedModelId: "",
  selectedGenerationId: "",
  filter: "",
  carTabState: CAR_TAB_STATES.allClosed,
};

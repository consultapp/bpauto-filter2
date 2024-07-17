import { createSlice } from "@reduxjs/toolkit";
import { CarApiItem } from "@/types";
import { CAR_TAB_STATES } from "@/fixtures/consts";

interface InitialState {
  brands: CarApiItem[];
  brandsIds: string[];
  models: { [parentId: string]: CarApiItem[] };
  modelsIds: string[];
  generations: { [parentId: string]: CarApiItem[] };
  generationsIds: string[];
  tabsState: keyof typeof CAR_TAB_STATES;
}

const initialState: InitialState = {
  brands: [],
  models: {},
  generations: {},
  brandsIds: [],
  modelsIds: [],
  generationsIds: [],

  tabsState: CAR_TAB_STATES.allClosed,
};

export const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {},
});

// const initBrand = useCallback(() => {
//     const brandsJson = sessionStorage.getItem("brands");
//     if (brandsJson) {
//       const brands = JSON.parse(brandsJson);
//       dispatch({
//         type: INIT_BRANDS,
//         payload: brands,
//       });
//     } else {
//       fetch(`${API_SELECT_LIST_URL}?sec_type=1`)
//         .then((result) => result.json())
//         .then((data) => {
//           dispatch({
//             type: INIT_BRANDS,
//             payload: data,
//           });
//         });
//     }

//     const models = JSON.parse(sessionStorage.getItem("models"));
//     if (models?.ids.length) {
//       dispatch({
//         type: INIT_MODELS,
//         payload: models,
//       });
//     }

//     const generations = JSON.parse(sessionStorage.getItem("generations"));
//     if (generations?.ids.length) {
//       dispatch({
//         type: INIT_GENERATIONS,
//         payload: generations,
//       });
//     }
//   }, [dispatch]);

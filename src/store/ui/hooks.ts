import { useDispatch, useSelector } from "react-redux";
import { uiTabSelector } from "./selectors";
import { setTab } from "./uiSlice";

export const useTab = () => useSelector(uiTabSelector);

export const useSetTab = () => {
  const dispatch = useDispatch();
  return (tabIndex: number) => dispatch(setTab(tabIndex));
};

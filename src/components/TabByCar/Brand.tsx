import { useGetBrandsQuery } from "@/store/api/brand";
import CustomInput from "../ui/CustomInput/CustomInput";
import { useSelector } from "react-redux";
import {
  startSectionCodesSelector,
  uiBrandIdSelector,
  uiCarTabStateSelector,
  uiFilterSelector,
} from "@/store/ui/selectors";
import { useEffect, useMemo } from "react";
import { getIdByCode, getItemById } from "@/functions/utils";
import {
  useResetStartData,
  useSetBrand,
  useSetCarTabState,
  useSetFilter,
} from "@/store/ui/hooks";
import LoaderSvg from "../ui/LoaderSvg/LoaderSvg";
import TogglerSvg from "../ui/TogglerSvg/TogglerSvg";
import { CAR_TAB_STATES } from "@/fixtures/consts";

export default function Brand() {
  const setBrand = useSetBrand();
  const setTab = useSetCarTabState();
  const brandID = useSelector(uiBrandIdSelector);
  const startSections = useSelector(startSectionCodesSelector);
  const resetStartData = useResetStartData();
  const { data, error, isLoading } = useGetBrandsQuery();
  const brand = useMemo(() => getItemById(data, brandID), [data, brandID]);
  const opened = useSelector(uiCarTabStateSelector) === CAR_TAB_STATES.brand;
  const filter = useSelector(uiFilterSelector);
  const setFilter = useSetFilter();

  const clickHandler = () => {
    if (!isLoading && data?.length)
      setTab(!opened ? CAR_TAB_STATES.brand : CAR_TAB_STATES.allClosed);
  };

  useEffect(() => {
    if (data?.length && startSections[0]) {
      setBrand(getIdByCode(data, startSections[0]));
      const arr = [...startSections];
      arr[0] = "";
      resetStartData(arr);
    }
  }, [data, resetStartData, setBrand, startSections]);

  return (
    <CustomInput
      placeholder={
        typeof brand === "object" && brand?.name ? brand?.name : "Марка"
      }
      svg={isLoading ? <LoaderSvg /> : <TogglerSvg open={opened} />}
      disabled={isLoading || error || !opened}
      onClick={clickHandler}
      onChange={(e) => {
        setFilter(e.target.value);
      }}
      value={opened ? filter : brand?.name}
    />
  );
}

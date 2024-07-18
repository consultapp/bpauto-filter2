import { useGetBrandsQuery } from "@/store/api/brand";
import CustomInput from "../ui/CustomInput/CustomInput";
import { useSelector } from "react-redux";
import {
  uiBrandIdSelector,
  uiCarTabStateSelector,
  uiFilterSelector,
} from "@/store/ui/selectors";
import { useMemo } from "react";
import { getItemById } from "@/functions/utils";
import { useSetCarTabState, useSetFilter } from "@/store/ui/hooks";
import LoaderSvg from "../ui/LoaderSvg/LoaderSvg";
import TogglerSvg from "../ui/TogglerSvg/TogglerSvg";
import { CAR_TAB_STATES } from "@/fixtures/consts";

export default function Brand() {
  const setTab = useSetCarTabState();
  const brandID = useSelector(uiBrandIdSelector);

  const { data, error, isLoading } = useGetBrandsQuery();
  const brand = useMemo(() => getItemById(data, brandID), [data, brandID]);
  const opened = useSelector(uiCarTabStateSelector) === CAR_TAB_STATES.brand;
  const filter = useSelector(uiFilterSelector);
  const setFilter = useSetFilter();

  const clickHandler = () => {
    if (!isLoading && data?.length)
      setTab(!opened ? CAR_TAB_STATES.brand : CAR_TAB_STATES.allClosed);
  };

  return (
    <CustomInput
      placeholder={
        typeof brand === "object" && brand?.name ? brand?.name : "Марка"
      }
      svg={
        isLoading ? (
          <LoaderSvg />
        ) : (
          <TogglerSvg tabName={CAR_TAB_STATES.brand} />
        )
      }
      disabled={isLoading || error || !data.length}
      onClick={clickHandler}
      onChange={(e) => {
        setFilter(e.target.value);
      }}
      value={opened ? filter : brand?.name}
    />
  );
}

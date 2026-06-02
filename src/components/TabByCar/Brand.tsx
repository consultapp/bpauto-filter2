import { useBrands } from "@/api/sections";
import { CAR_TAB_STATES } from "@/fixtures/consts";
import { getItemById } from "@/functions/utils";
import { useFilter } from "@/context/filterHooks";
import { useSetCarTabState, useSetFilter } from "@/context/filterHooks";
import { useCallback, useMemo } from "react";
import CustomInput from "../ui/CustomInput/CustomInput";
import LoaderSvg from "../ui/LoaderSvg/LoaderSvg";
import TogglerSvg from "../ui/TogglerSvg/TogglerSvg";

export default function Brand() {
  const { selectedBrandId, carTabState, filter } = useFilter();
  const setTab = useSetCarTabState();
  const setFilter = useSetFilter();

  const { data, error, isLoading } = useBrands();
  const brand = useMemo(
    () => getItemById(data, selectedBrandId),
    [data, selectedBrandId]
  );
  const opened = carTabState === CAR_TAB_STATES.brand;

  const clickHandler = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!isLoading && data.length)
        setTab(!opened ? CAR_TAB_STATES.brand : CAR_TAB_STATES.allClosed);
    },
    [data.length, isLoading, opened, setTab]
  );

  return (
    <CustomInput
      label={!opened}
      placeholder={
        typeof brand === "object" && brand?.name ? brand.name : "Марка"
      }
      svg={
        isLoading ? (
          <LoaderSvg />
        ) : (
          <TogglerSvg tabName={CAR_TAB_STATES.brand} />
        )
      }
      disabled={isLoading || Boolean(error) || !data.length}
      onClick={clickHandler}
      onChange={(e) => {
        setFilter(e.target.value);
      }}
      value={opened ? filter : brand?.name}
    />
  );
}

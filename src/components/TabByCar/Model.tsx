import { useModels } from "@/api/sections";
import { CAR_TAB_STATES } from "@/fixtures/consts";
import { getItemById } from "@/functions/utils";
import { useFilter } from "@/context/filterHooks";
import { useSetCarTabState, useSetFilter } from "@/context/filterHooks";
import { useCallback, useMemo } from "react";
import CustomInput from "../ui/CustomInput/CustomInput";
import LoaderSvg from "../ui/LoaderSvg/LoaderSvg";
import TogglerSvg from "../ui/TogglerSvg/TogglerSvg";

export default function Model() {
  const { selectedBrandId, selectedModelId, carTabState, filter } =
    useFilter();
  const setTab = useSetCarTabState();
  const setFilter = useSetFilter();

  const { data, error, isLoading } = useModels(selectedBrandId);
  const model = useMemo(
    () => getItemById(data, selectedModelId),
    [data, selectedModelId]
  );
  const opened = carTabState === CAR_TAB_STATES.model;

  const clickHandler = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!isLoading && data.length)
        setTab(opened ? CAR_TAB_STATES.allClosed : CAR_TAB_STATES.model);
    },
    [data.length, isLoading, opened, setTab]
  );

  return (
    <CustomInput
      label={!opened}
      placeholder={
        typeof model === "object" && model?.name ? model.name || "" : "Модель"
      }
      svg={
        isLoading ? (
          <LoaderSvg />
        ) : (
          <TogglerSvg tabName={CAR_TAB_STATES.model} />
        )
      }
      disabled={isLoading || Boolean(error) || !data.length}
      onClick={clickHandler}
      onChange={(e) => {
        setFilter(e.target.value);
      }}
      value={opened ? filter : model?.name}
    />
  );
}

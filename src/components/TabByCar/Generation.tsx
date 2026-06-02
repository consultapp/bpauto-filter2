import { useGenerations } from "@/api/sections";
import { CAR_TAB_STATES } from "@/fixtures/consts";
import { getItemById } from "@/functions/utils";
import { useFilter } from "@/context/filterHooks";
import { useSetCarTabState, useSetFilter } from "@/context/filterHooks";
import { useCallback, useMemo } from "react";
import CustomInput from "../ui/CustomInput/CustomInput";
import LoaderSvg from "../ui/LoaderSvg/LoaderSvg";
import TogglerSvg from "../ui/TogglerSvg/TogglerSvg";

export default function Generation() {
  const { selectedModelId, selectedGenerationId, carTabState, filter } =
    useFilter();
  const setTab = useSetCarTabState();
  const setFilter = useSetFilter();

  const { data, error, isLoading } = useGenerations(selectedModelId);
  const generation = useMemo(
    () => getItemById(data, selectedGenerationId),
    [data, selectedGenerationId]
  );
  const opened = carTabState === CAR_TAB_STATES.generation;

  const clickHandler = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!isLoading && data.length)
        setTab(!opened ? CAR_TAB_STATES.generation : CAR_TAB_STATES.allClosed);
    },
    [data.length, isLoading, opened, setTab]
  );

  return (
    <CustomInput
      label={!opened}
      placeholder={
        typeof generation === "object" && generation?.name
          ? generation.name || ""
          : "Поколение"
      }
      svg={
        isLoading ? (
          <LoaderSvg />
        ) : (
          <TogglerSvg tabName={CAR_TAB_STATES.generation} />
        )
      }
      disabled={isLoading || Boolean(error) || !data.length}
      onClick={clickHandler}
      onChange={(e) => {
        setFilter(e.target.value);
      }}
      value={opened ? filter : generation?.name}
    />
  );
}

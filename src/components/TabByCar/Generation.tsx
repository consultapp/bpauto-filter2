import { useGetGenerationsQuery } from "@/store/api/generation";
import CustomInput from "../ui/CustomInput/CustomInput";
import { useSelector } from "react-redux";
import {
  uiCarTabStateSelector,
  uiFilterSelector,
  uiGenerationIdSelector,
  uiModelIdSelector,
} from "@/store/ui/selectors";
import { useCallback, useMemo, useRef } from "react";
import { getItemById } from "@/functions/utils";
import { useSetCarTabState, useSetFilter } from "@/store/ui/hooks";
import { CAR_TAB_STATES } from "@/fixtures/consts";
import LoaderSvg from "../ui/LoaderSvg/LoaderSvg";
import TogglerSvg from "../ui/TogglerSvg/TogglerSvg";

export default function Generation() {
  const modelId = useSelector(uiModelIdSelector);
  const generationId = useSelector(uiGenerationIdSelector);

  const input = useRef<HTMLInputElement>(null);

  const { data, error, isLoading } = useGetGenerationsQuery(modelId);

  const generation = useMemo(
    () => getItemById(data, generationId),
    [data, generationId]
  );

  const setTab = useSetCarTabState();

  const opened =
    useSelector(uiCarTabStateSelector) === CAR_TAB_STATES.generation;
  const filter = useSelector(uiFilterSelector);
  const setFilter = useSetFilter();

  const clickHandler = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!isLoading && data?.length)
        setTab(!opened ? CAR_TAB_STATES.generation : CAR_TAB_STATES.allClosed);
    },
    [data?.length, isLoading, opened, setTab]
  );

  return (
    <CustomInput
      label={!opened}
      ref={input}
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
      disabled={isLoading || error || !data.length}
      onClick={clickHandler}
      onChange={(e) => {
        setFilter(e.target.value);
      }}
      value={opened ? filter : generation?.name}
    />
  );
}

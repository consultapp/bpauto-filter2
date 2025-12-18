import CustomInput from "../ui/CustomInput/CustomInput";
import { useGetModelsQuery } from "@/store/api/model";
import { useSelector } from "react-redux";
import {
  uiBrandIdSelector,
  uiCarTabStateSelector,
  uiFilterSelector,
  uiModelIdSelector,
} from "@/store/ui/selectors";
import LoaderSvg from "../ui/LoaderSvg/LoaderSvg";
import { useSetCarTabState, useSetFilter } from "@/store/ui/hooks";
import { useCallback, useMemo } from "react";
import { getItemById } from "@/functions/utils";
import { CAR_TAB_STATES } from "@/fixtures/consts";
import TogglerSvg from "../ui/TogglerSvg/TogglerSvg";

export default function Model() {
  const brandId = useSelector(uiBrandIdSelector);
  const modelId = useSelector(uiModelIdSelector);
  const { data, error, isLoading } = useGetModelsQuery(brandId);

  const model = useMemo(() => getItemById(data, modelId), [data, modelId]);

  const setTab = useSetCarTabState();

  const opened = useSelector(uiCarTabStateSelector) === CAR_TAB_STATES.model;
  const filter = useSelector(uiFilterSelector);
  const setFilter = useSetFilter();

  const clickHandler = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!isLoading && data?.length)
        setTab(opened ? CAR_TAB_STATES.allClosed : CAR_TAB_STATES.model);
    },
    [data?.length, isLoading, opened, setTab]
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
      disabled={isLoading || error || !data.length} //|| !opened
      onClick={clickHandler}
      onChange={(e) => {
        setFilter(e.target.value);
      }}
      value={opened ? filter : model?.name}
    />
  );
}

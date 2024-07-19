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
import { useLayoutEffect, useMemo, useRef } from "react";
import { getItemById } from "@/functions/utils";
import { CAR_TAB_STATES } from "@/fixtures/consts";
import TogglerSvg from "../ui/TogglerSvg/TogglerSvg";

export default function Model() {
  const brandId = useSelector(uiBrandIdSelector);
  const modelId = useSelector(uiModelIdSelector);
  const { data, error, isLoading } = useGetModelsQuery(brandId);

  const model = useMemo(() => getItemById(data, modelId), [data, modelId]);

  const input = useRef<HTMLInputElement>(null);

  const setTab = useSetCarTabState();

  const opened = useSelector(uiCarTabStateSelector) === CAR_TAB_STATES.model;
  const filter = useSelector(uiFilterSelector);
  const setFilter = useSetFilter();

  const clickHandler = () => {
    if (!isLoading && data?.length)
      setTab(!opened ? CAR_TAB_STATES.model : CAR_TAB_STATES.allClosed);
  };

  useLayoutEffect(() => {
    if (opened) {
      if (input?.current) input.current.focus();
    }
  }, [opened]);

  return (
    <CustomInput
      ref={input}
      placeholder={
        typeof model === "object" && model?.name ? model.name || "" : "Марка"
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

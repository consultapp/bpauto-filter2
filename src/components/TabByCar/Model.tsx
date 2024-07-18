import CustomInput from "../ui/CustomInput/CustomInput";
import { useGetModelsQuery } from "@/store/api/model";
import { useSelector } from "react-redux";
import {
  startSectionCodesSelector,
  uiBrandIdSelector,
  uiCarTabStateSelector,
  uiFilterSelector,
  uiModelIdSelector,
} from "@/store/ui/selectors";
import LoaderSvg from "../ui/LoaderSvg/LoaderSvg";
import {
  useResetStartData,
  useSetCarTabState,
  useSetFilter,
  useSetModel,
} from "@/store/ui/hooks";
import { useEffect, useMemo } from "react";
import { getIdByCode, getItemById } from "@/functions/utils";
import { CAR_TAB_STATES } from "@/fixtures/consts";
import TogglerSvg from "../ui/TogglerSvg/TogglerSvg";

export default function Model() {
  const setModel = useSetModel();
  const brandId = useSelector(uiBrandIdSelector);
  const modelId = useSelector(uiModelIdSelector);
  const startSections = useSelector(startSectionCodesSelector);
  const { data, error, isLoading } = useGetModelsQuery(brandId);

  const model = useMemo(() => getItemById(data, modelId), [data, modelId]);

  const setTab = useSetCarTabState();
  const resetStartData = useResetStartData();

  const opened = useSelector(uiCarTabStateSelector) === CAR_TAB_STATES.model;
  const filter = useSelector(uiFilterSelector);
  const setFilter = useSetFilter();

  const clickHandler = () => {
    if (!isLoading && data?.length)
      setTab(!opened ? CAR_TAB_STATES.model : CAR_TAB_STATES.allClosed);
  };

  console.log("data", data);

  useEffect(() => {
    if (data?.length && startSections[1]) {
      setModel(getIdByCode(data, startSections[1]));
      const arr = [...startSections];
      arr[1] = "";
      resetStartData(arr);
    }
  }, [data, resetStartData, setModel, startSections]);

  return (
    <CustomInput
      placeholder={
        typeof model === "object" && model?.name ? model?.name : "Марка"
      }
      svg={isLoading ? <LoaderSvg /> : <TogglerSvg open={opened} />}
      disabled={isLoading || error || !opened}
      onClick={clickHandler}
      onChange={(e) => {
        setFilter(e.target.value);
      }}
      value={opened ? filter : model?.name}
    />
  );
}

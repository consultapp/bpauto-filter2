import DroppingWindow from "@/components/DroppingWindow/DroppingWindow";
import { CAR_TAB_STATES } from "@/fixtures/consts";
import { useGetBrandsQuery } from "@/store/api/brand";
import { useGetGenerationsQuery } from "@/store/api/generation";
import { useGetModelsQuery } from "@/store/api/model";
import {
  uiBrandIdSelector,
  uiCarTabStateSelector,
  uiFilterSelector,
  uiModelIdSelector,
} from "@/store/ui/selectors";
import { CarApiItem } from "@/types";
import { useMemo } from "react";
import { useSelector } from "react-redux";

import styles from "./style.module.scss";
import SelectItem from "./SelectItem";
import { useSelectCar } from "@/store/ui/hooks";
import LoaderSvg from "../ui/LoaderSvg/LoaderSvg";

export default function SelectWindow() {
  const opened = useSelector(uiCarTabStateSelector);
  const filter = useSelector(uiFilterSelector);
  const setCar = useSelectCar();
  const brandID = useSelector(uiBrandIdSelector);
  const modelId = useSelector(uiModelIdSelector);

  const { data: brands = [], isLoading: L1 } = useGetBrandsQuery();
  const { data: models = [], isLoading: L2 } = useGetModelsQuery(brandID);
  const { data: generations = [], isLoading: L3 } =
    useGetGenerationsQuery(modelId);

  const loading = L1 || L2 || L3;

  let data = brands;
  switch (opened) {
    case CAR_TAB_STATES.model:
      data = models;
      break;
    case CAR_TAB_STATES.generation:
      data = generations;
      break;
  }

  const filteredData: CarApiItem[] = useMemo(() => {
    return ((data as CarApiItem[]) ?? []).filter((item) =>
      item.name.includes(filter)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, filter, opened]);

  if (opened === CAR_TAB_STATES.allClosed) {
    return;
  }

  return (
    <DroppingWindow>
      {loading ? (
        <LoaderSvg />
      ) : filteredData.length ? (
        <div className={styles.grid}>
          {filteredData.map((item) => (
            <SelectItem
              key={item.id}
              setCar={() => {
                setCar({ [`${opened}Id`]: item.id });
              }}
              item={item}
            />
          ))}
        </div>
      ) : (
        <div className={styles.noElements}>
          Нет соответствующих фильру элементов.
        </div>
      )}
    </DroppingWindow>
  );
}

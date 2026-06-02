import DroppingWindow from "@/components/DroppingWindow/DroppingWindow";
import { useBrands, useGenerations, useModels } from "@/api/sections";
import { CAR_TAB_STATES } from "@/fixtures/consts";
import { useFilter } from "@/context/filterHooks";
import { useSelectCar } from "@/context/filterHooks";
import LoaderSvg from "../ui/LoaderSvg/LoaderSvg";
import styles from "./style.module.scss";
import SelectItem from "./SelectItem";

export default function SelectWindow() {
  const {
    carTabState: opened,
    filter,
    selectedBrandId: brandID,
    selectedModelId: modelId,
  } = useFilter();
  const selectCar = useSelectCar();

  const { data: brands, isLoading: L1 } = useBrands();
  const { data: models, isLoading: L2 } = useModels(brandID);
  const { data: generations, isLoading: L3 } = useGenerations(modelId);

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

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().startsWith(filter.toLocaleLowerCase())
  );

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
                if (opened === CAR_TAB_STATES.generation)
                  location.href = item.url;
                selectCar({ [`${opened}Id`]: item.id });
              }}
              item={item}
            />
          ))}
        </div>
      ) : (
        <div className={styles.noElements}>
          Нет соответствующих фильтру элементов.
        </div>
      )}
    </DroppingWindow>
  );
}

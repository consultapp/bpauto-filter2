import DroppingWindow from "@/components/DroppingWindow/DroppingWindow";
import { useBrands, useGenerations, useModels } from "@/api/sections";
import { CAR_TAB_STATES } from "@/fixtures/consts";
import { useFilter, useSelectCar } from "@/context/filterHooks";
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

  const brandsQuery = useBrands();
  const modelsQuery = useModels(brandID);
  const generationsQuery = useGenerations(modelId);

  if (opened === CAR_TAB_STATES.allClosed) {
    return;
  }

  const activeQuery =
    opened === CAR_TAB_STATES.model
      ? modelsQuery
      : opened === CAR_TAB_STATES.generation
        ? generationsQuery
        : brandsQuery;

  const { data, isLoading, error } = activeQuery;

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().startsWith(filter.toLocaleLowerCase())
  );

  return (
    <DroppingWindow>
      {isLoading ? (
        <div className={styles.center}>
          <LoaderSvg size={36} className={styles.centerLoader} />
        </div>
      ) : error ? (
        <div className={styles.noElements}>Не удалось загрузить список.</div>
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

import { useSetTab, useTab } from "@/store/ui/hooks";
import classNames from "classnames";
import styles from "./style.module.scss";

const tabs = ["По параметрам", "По товарам", "По артикулу"];

export default function TabsController() {
  const tab = useTab();
  const setTab = useSetTab();

  return (
    <div className={styles.tabs}>
      {tabs.map((name, i) => (
        <div
          key={name}
          className={classNames(styles.tab, tab === i && styles.active)}
          onClick={() => setTab(i)}
        >
          {name}
        </div>
      ))}
      <div className={styles.rating}>Рейтинг</div>
    </div>
  );
}

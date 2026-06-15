import { useTab } from "@/context/filterHooks";
import TabByCar from "../TabByCar/TabByCar";
import styles from "./style.module.scss";
import TabArticul from "../TabArticul/TabArticul";

export default function SelectedTab() {
  const tab = useTab();
  return (
    <div className={styles.root}>
      <section
        role="tabpanel"
        id="filter-tabpanel-0"
        aria-labelledby="filter-tab-0"
        hidden={tab !== 0}
      >
        <TabByCar />
      </section>
      <section
        role="tabpanel"
        id="filter-tabpanel-1"
        aria-labelledby="filter-tab-1"
        hidden={tab !== 1}
      >
        <TabArticul />
      </section>
    </div>
  );
}

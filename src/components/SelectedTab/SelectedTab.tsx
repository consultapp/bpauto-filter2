import { useTab } from "@/store/ui/hooks";
import TabByCar from "../TabByCar/TabByCar";
import styles from "./style.module.scss";
// import TabYandexSearch from "../TabYandexSearch/TabYandexSearch";
import TabArticul from "../TabArticul/TabArticul";

export default function SelectedTab() {
  const tab = useTab();
  return (
    <div className={styles.root}>
      {tab === 0 && <TabByCar />}
      {/* {tab === 1 && <TabYandexSearch />} */}
      {tab === 2 && <TabArticul />}
    </div>
  );
}

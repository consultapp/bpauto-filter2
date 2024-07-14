import { useTab } from "@/store/ui/hooks";
import TabByCar from "../TabByCar/TabByCar";
import styles from "./style.module.scss";

export default function SelectedTab() {
  const tab = useTab();
  return (
    <div className={styles.root}>
      {tab === 0 && <TabByCar />}
      {tab === 1 && <div>11111</div>}
      {tab === 2 && <div>22222</div>}
    </div>
  );
}

import TabByCar from "../TabByCar/TabByCar";
import styles from "./style.module.scss";

export default function SelectedTab() {
  return (
    <div className={styles.root}>
      <TabByCar />
    </div>
  );
}

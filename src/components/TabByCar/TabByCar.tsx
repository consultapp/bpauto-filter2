import styles from "./style.module.scss";
import ByBrand from "./Brand";
import Model from "./Model";
import Generation from "./Generation";

export default function TabByCar() {
  return (
    <div className={styles.fields}>
      <ByBrand />
      <Model />
      <Generation />
    </div>
  );
}

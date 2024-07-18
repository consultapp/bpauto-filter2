import styles from "./style.module.scss";
import Brand from "./Brand";
import Model from "./Model";
import Generation from "./Generation";
import SelectWindow from "../SelectWindow/SelectWindow";

export default function TabByCar() {
  return (
    <>
      <div className={styles.fields}>
        <Brand />
        <Model />
        <Generation />
      </div>
      <SelectWindow />
    </>
  );
}

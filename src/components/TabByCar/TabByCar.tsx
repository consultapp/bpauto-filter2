import { ChevronRight } from "lucide-react";
import styles from "./style.module.scss";

const fileds = ["mark", "model", "generation"];

export default function TabByCar() {
  return (
    <div className={styles.fields}>
      {fileds.map((item, i) => (
        <div className={styles.field} key={i}>
          <input type="text" id={item} placeholder={"text " + i} />
          <ChevronRight className="" />
        </div>
      ))}
    </div>
  );
}

import { Star } from "lucide-react";
import styles from "./style.module.scss";

export default function Rating() {
  return (
    <div className={styles.root}>
      <a href="https://www.avito.ru/brands/bpauto" target="_blank">
        <Star fill="currentColor" size={"18px"} />
        <span>4,9&nbsp;Avito</span>
      </a>
      <a href="https://yandex.ru/profile/1060062940" target="_blank">
        <Star fill="currentColor" size={"18px"} />
        <span>
          4,8&nbsp;<span style={{ color: "red", fontWeight: 600 }}>Y</span>andex
        </span>
      </a>
    </div>
  );
}

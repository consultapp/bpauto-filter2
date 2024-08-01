import { Star } from "lucide-react";
import styles from "./style.module.scss";
import { SOCIAL_RATING_FILTER } from "@/fixtures/consts";

export default function Rating() {
  const { avito, yandex } =
    JSON.parse(
      (document.getElementById("socialRating") as HTMLMetaElement).content
    ) ?? SOCIAL_RATING_FILTER;
  return (
    <div className={styles.root}>
      <a href={avito.link} target="_blank">
        <Star fill="currentColor" size={"18px"} />
        <span>{avito.rating}&nbsp;Avito</span>
      </a>
      <a href={yandex.link} target="_blank">
        <Star fill="currentColor" size={"18px"} />
        <span>
          {yandex.rating}&nbsp;
          <span style={{ color: "red", fontWeight: 600 }}>Y</span>andex
        </span>
      </a>
    </div>
  );
}

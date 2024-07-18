import { CarApiItem } from "@/types";
import styles from "./style.module.scss";

type Props = { item: CarApiItem; setCar: () => void };

export default function SelectItem({ item, setCar }: Props) {
  return (
    <div
      className={styles.anchor}
      onClick={(e) => {
        e.preventDefault();
        setCar();
      }}
    >
      {item.name}
    </div>
  );
}

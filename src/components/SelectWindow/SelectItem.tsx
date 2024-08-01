import styles from "./style.module.scss";
import { useContext } from "react";
import { RootContex } from "../HeaderFilter/HeaderFilter";

type Props = { item: CarApiItem; setCar: () => void };

export default function SelectItem({ item, setCar }: Props) {
  const scrollToRoot = useContext(RootContex);
  return (
    <div
      className={styles.anchor}
      onClick={(e) => {
        e.preventDefault();
        scrollToRoot();
        setCar();
      }}
    >
      {item.name}
    </div>
  );
}

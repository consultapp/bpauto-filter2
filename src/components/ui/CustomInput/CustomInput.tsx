import classNames from "classnames";
import styles from "./style.module.scss";
import { RefObject } from "react";

type Props = {
  key?: string | number;
  placeholder?: string;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  spin?: boolean;
  svg?: React.ReactElement;
  ref?: RefObject<HTMLInputElement>;
};

export default function CustomInput({
  key,
  placeholder,
  id,
  onChange,
  spin,
  svg,
  ref,
}: Props) {
  return (
    <div className={styles.field} key={key}>
      <input
        type="text"
        id={id}
        ref={ref}
        placeholder={placeholder}
        onChange={onChange}
        className={classNames(spin && "spin")}
      />
      {svg}
    </div>
  );
}

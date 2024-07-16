import classNames from "classnames";
import styles from "./style.module.scss";

type Props = {
  placeholder?: string;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  spin?: boolean;
  svg?: React.ReactElement;
  value?: string;
  max?: number;
  className?: string;
};

export default function CustomInput({
  className,
  placeholder,
  id,
  onChange,
  spin,
  svg,
  value,
  max,
}: Props) {
  return (
    <div className={classNames(className, styles.field)}>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        className={classNames(spin && "spin")}
        value={value}
        maxLength={max}
      />
      {svg}
    </div>
  );
}

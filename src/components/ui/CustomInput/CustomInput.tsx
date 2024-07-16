import classNames from "classnames";
import styles from "./style.module.scss";

type Props = {
  placeholder?: string;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  spin?: boolean;
  svg?: React.ReactElement;
  value?: string;
  max?: number;
  className?: string;
  autoFocus?: boolean;
};

export default function CustomInput({
  className,
  placeholder,
  id,
  onChange,
  onKeyDown,
  spin,
  svg,
  value,
  max,
  autoFocus = false,
}: Props) {
  return (
    <div className={classNames(className, styles.field)}>
      <input
        type="text"
        autoFocus={autoFocus}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        className={classNames(spin && "spin")}
        value={value}
        maxLength={max}
        onKeyDown={onKeyDown}
      />
      {svg}
    </div>
  );
}

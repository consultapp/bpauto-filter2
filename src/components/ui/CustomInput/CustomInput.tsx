import classNames from "classnames";
import styles from "./style.module.scss";
import { ForwardedRef, forwardRef } from "react";

type Props = {
  placeholder?: string;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  svg?: React.ReactElement;
  value?: string;
  max?: number;
  className?: string;
  autoFocus?: boolean;
  disabled?: boolean;
};

const CustomInput = forwardRef(function CustomInput(
  {
    className,
    placeholder,
    id,
    onChange,
    onKeyDown,
    onClick,
    svg,
    value,
    max,
    autoFocus = false,
    disabled = false,
  }: Props,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <div
      className={classNames(
        className,
        styles.field,
        disabled && styles.disabled
      )}
      onPointerDownCapture={onClick}
    >
      <input
        className={classNames(styles.input)}
        disabled={disabled}
        type="text"
        autoFocus={autoFocus}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        maxLength={max}
        onKeyDown={onKeyDown}
        ref={ref}
      />
      {svg}
    </div>
  );
});

export default CustomInput;

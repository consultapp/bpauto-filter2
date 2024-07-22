import classNames from "classnames";
import styles from "./style.module.scss";
import { useLayoutEffect, useRef } from "react";

type Props = {
  placeholder?: string;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClick?: (e: React.PointerEvent<HTMLDivElement>) => void;
  svg?: React.ReactElement;
  value?: string;
  max?: number;
  className?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  label?: boolean;
};

function CustomInput({
  className,
  placeholder,
  id,
  onChange,
  onKeyDown,
  onClick,
  svg,
  value,
  max,
  autoFocus = true,
  disabled = false,
  label = false,
}: Props) {
  const input = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (input?.current && autoFocus) {
      input?.current.focus({ preventScroll: true });
    }
  });

  return (
    <div
      className={classNames(
        className,
        styles.field,
        disabled && styles.disabled
      )}
      onPointerDownCapture={onClick}
    >
      {label ? (
        <div className={classNames(styles.label)}>{placeholder}</div>
      ) : (
        <input
          className={classNames(styles.input)}
          disabled={disabled}
          type="text"
          // autoFocus={autoFocus}
          id={id}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          maxLength={max}
          onKeyDown={onKeyDown}
          ref={input}
        />
      )}
      {svg}
    </div>
  );
}

export default CustomInput;

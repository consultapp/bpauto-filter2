import classNames from "classnames";
import { LoaderCircle } from "lucide-react";
import styles from "./style.module.scss";

type Props = {
  className?: string;
  size?: number;
};

export default function LoaderSvg({ className, size = 24 }: Props) {
  return (
    <LoaderCircle className={classNames(styles.root, className)} size={size} />
  );
}

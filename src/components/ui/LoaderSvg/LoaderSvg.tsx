import classNames from "classnames";
import { LoaderCircle } from "lucide-react";
import styles from "./style.module.scss";

type Props = {
  className?: string;
};

export default function LoaderSvg({ className }: Props) {
  return <LoaderCircle className={classNames(styles.root, className)} />;
}

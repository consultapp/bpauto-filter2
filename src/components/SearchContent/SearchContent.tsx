import styles from "./style.module.scss";

type Props = {
  children: React.ReactNode;
};

export default function SearchContent({ children }: Props) {
  return <div className={styles.root}>{children}</div>;
}

import styles from "./style.module.scss";

type Props = {
  children: React.ReactNode;
};

export default function DroppingWindow({ children }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.root}>{children}</div>
    </div>
  );
}

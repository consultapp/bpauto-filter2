import Logo from "@/assets/logo.png";

import TabsController from "@/components/TabsController/TabsController";
import SelectedTab from "../SelectedTab/SelectedTab";

import styles from "./style.module.scss";

export default function HeaderFilter() {
  return (
    <div className={styles.root}>
      <div className={styles.logo}>
        <a href="/">
          <img src={Logo} alt="logotype bpauto" />
        </a>
      </div>
      <div className={styles.filter}>
        <TabsController />
        <SelectedTab />
      </div>
    </div>
  );
}

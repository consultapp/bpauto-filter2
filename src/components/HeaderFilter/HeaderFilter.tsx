import Logo from "@/assets/logo.png";

import TabsController from "@/components/TabsController/TabsController";
import SelectedTab from "../SelectedTab/SelectedTab";

import styles from "./style.module.scss";
import { createContext, useCallback, useRef } from "react";

export const RootContex = createContext(() => {});
export default function HeaderFilter() {
  const root = useRef<HTMLDivElement>(null);
  const scrollToRoot = useCallback(() => {
    if (root?.current) {
      root.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [root]);

  return (
    <RootContex.Provider value={scrollToRoot}>
      <div className={styles.root} ref={root}>
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
    </RootContex.Provider>
  );
}

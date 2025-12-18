import Logo from '@/assets/logo.png'
import LogoNg from '@/assets/logo-ng.png'

import TabsController from '@/components/TabsController/TabsController'
import SelectedTab from '../SelectedTab/SelectedTab'

import styles from './style.module.scss'
import { createContext, useCallback, useMemo, useRef } from 'react'

export const RootContex = createContext(() => {})
export default function HeaderFilter() {
  const root = useRef<HTMLDivElement>(null)

  const isNg = useMemo(() => {
    const today = new Date()
    const month = today.getMonth() + 1 // 1-12
    const day = today.getDate()
    return (month === 12 && day >= 15) || (month === 1 && day <= 10)
  }, [])

  const scrollToRoot = useCallback(() => {
    if (root?.current) {
      root.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [root])

  return (
    <RootContex.Provider value={scrollToRoot}>
      <div className={styles.root} ref={root}>
        <div className={styles.logo}>
          <a href="/">
            <img src={isNg ? LogoNg : Logo} alt="logotype" />
          </a>
        </div>
        <div className={styles.filter}>
          <TabsController />
          <SelectedTab />
        </div>
      </div>
    </RootContex.Provider>
  )
}

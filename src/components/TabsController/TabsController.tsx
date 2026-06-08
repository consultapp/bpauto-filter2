import { useSetTab, useTab } from '@/context/filterHooks'
import classNames from 'classnames'
import styles from './style.module.scss'
import Rating from '../Rating/Rating'

const tabs = ['По параметрам', 'По номеру']

export default function TabsController() {
  const tab = useTab()
  const setTab = useSetTab()

  return (
    <div className={styles.tabs}>
      {tabs.map((name, i) => (
        <div
          key={name}
          className={classNames(styles.tab, tab === i && styles.active)}
          onClick={() => setTab(i)}
        >
          {name}
        </div>
      ))}
      <div className={styles.rating}>
        <Rating />
      </div>
    </div>
  )
}

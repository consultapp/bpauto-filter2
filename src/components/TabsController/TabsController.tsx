import { useSetTab, useTab } from '@/context/filterHooks'
import classNames from 'classnames'
import styles from './style.module.scss'
import Rating from '../Rating/Rating'

const tabs = ['По параметрам', 'По номеру'] as const

export default function TabsController() {
  const tab = useTab()
  const setTab = useSetTab()

  return (
    <nav className={styles.tabs} aria-label="Тип поиска">
      <div role="tablist" className={styles.tablist}>
        {tabs.map((name, i) => (
          <button
            key={name}
            type="button"
            role="tab"
            id={`filter-tab-${i}`}
            className={classNames(styles.tab, tab === i && styles.active)}
            aria-selected={tab === i}
            aria-controls={`filter-tabpanel-${i}`}
            onClick={() => setTab(i)}
          >
            {name}
          </button>
        ))}
      </div>
      <div className={styles.rating}>
        <Rating />
      </div>
    </nav>
  )
}

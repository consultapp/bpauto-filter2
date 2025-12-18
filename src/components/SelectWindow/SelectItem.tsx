import styles from './style.module.scss'
import { useContext } from 'react'
import { RootContext } from '../HeaderFilter/HeaderFilter'

type Props = { item: CarApiItem; setCar: () => void }

export default function SelectItem({ item, setCar }: Props) {
  const scrollToRoot = useContext(RootContext)
  return (
    <div
      className={styles.anchor}
      onClick={(e) => {
        e.preventDefault()
        scrollToRoot()
        setCar()
      }}
    >
      {item.name}
    </div>
  )
}

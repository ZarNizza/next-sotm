import Link from 'next/link'
import styles from './Home.module.scss'

export default function Locales() {
  return (
    <div className={styles.squareRow}>
      <Link href="/settings" locale="en">
        <a className={styles.locale}>Eng</a>
      </Link>
      <Link href="/settings" locale="ru">
        <a className={styles.locale}>Рус</a>
      </Link>
    </div>
  )
}

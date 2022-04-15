import Link from 'next/link'
import styles from './Home.module.scss'

export default function Locales() {
  return (
    <div className={styles.squareWrapper}>
      <Link href="/settings" locale="ru">
        <div className={`${styles.halfsquare_top} ${styles.violet}`}>
          <p>Рус</p>
        </div>
      </Link>
      <Link href="/settings" locale="en">
        <div className={`${styles.halfsquare_bottom} ${styles.yellow}`}>
          <p>Eng</p>
        </div>
      </Link>
    </div>
  )
}

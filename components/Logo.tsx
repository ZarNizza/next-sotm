import Link from 'next/link'
import Image from 'next/image'
import styles from './Login.module.scss'

export default function Logo() {
  return (
    <div className={styles.logoRow}>
      <Link href="/" passHref>
        <div className={styles.logoBH}></div>
      </Link>
    </div>
  )
}

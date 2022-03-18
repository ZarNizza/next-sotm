import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Logo() {
  return (
    <div className={styles.rowElem}>
      <Link href="/" passHref>
        <div className={styles.logoBH}></div>
      </Link>
    </div>
  )
}

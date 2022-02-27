import Link from 'next/link'
import { useSession } from 'next-auth/react'
import styles from '../styles/Home.module.css'
import stylesChB from './CheckBoxButton.module.scss'

export default function Footer() {
  const { data: session } = useSession()
  // return session ? (
  return (
    <div className={styles.footer}>
      <Link href="/" passHref>
        <a className={styles.footerLink}>
          <span className={stylesChB.rb}>
            <div className={styles.footerLabel}>&#8962;</div>
          </span>
        </a>
      </Link>
      <Link href="/plus" passHref>
        <a className={styles.footerLink}>
          <span className={stylesChB.rb}>
            <div className={styles.footerLabel}> + </div>
          </span>
        </a>
      </Link>
      <Link href="/memo" passHref>
        <a className={styles.footerLink}>
          <span className={stylesChB.rb}>
            <div className={styles.footerLabel}>M</div>
          </span>
        </a>
      </Link>
      <Link href="/minus" passHref>
        <a className={styles.footerLink}>
          <span className={stylesChB.rb}>
            <div className={styles.footerLabel}> – </div>
          </span>
        </a>
      </Link>
      <Link href="/statistics" passHref>
        <a className={styles.footerLink}>
          <span className={stylesChB.rb}>
            <div className={styles.footerLabel}> = </div>
          </span>
        </a>
      </Link>
      <Link href="/settings" passHref>
        <a className={styles.footerLink}>
          <span className={stylesChB.rb}>
            <div className={styles.footerLabel}>Set</div>
          </span>
        </a>
      </Link>
      <Link href="/sys" passHref>
        <a className={styles.footerLink}>
          <span className={stylesChB.rb}>
            <div className={styles.footerLabel}>[Sys]</div>
          </span>
        </a>
      </Link>
    </div>
  )
}

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
            <div className={stylesChB.inputLabel}>&#8962;</div>
          </span>
        </a>
      </Link>
      <Link href="/add" passHref>
        <a className={styles.footerLink}>
          <span className={stylesChB.rb}>
            <div className={stylesChB.inputLabel}>(+)</div>
          </span>
        </a>
      </Link>
      <Link href="/memo" passHref>
        <a className={styles.footerLink}>
          <span className={stylesChB.rb}>
            <div className={stylesChB.inputLabel}>M</div>
          </span>
        </a>
      </Link>
      <Link href="/expenses" passHref>
        <a className={styles.footerLink}>
          <span className={stylesChB.rb}>
            <div className={stylesChB.inputLabel}>(–)</div>
          </span>
        </a>
      </Link>
      <Link href="/statistics" passHref>
        <a className={styles.footerLink}>
          <span className={stylesChB.rb}>
            <div className={stylesChB.inputLabel}>(=)</div>
          </span>
        </a>
      </Link>
      <Link href="/settings" passHref>
        <a className={styles.footerLink}>
          <span className={stylesChB.rb}>
            <div className={stylesChB.inputLabel}>&#10004;</div>
          </span>
        </a>
      </Link>
      <Link href="/sys" passHref>
        <a className={styles.footerLink}>
          <span className={stylesChB.rb}>
            <div className={stylesChB.inputLabel}>[Sys]</div>
          </span>
        </a>
      </Link>
    </div>
    // ) : (
    //   <div className={styles.footer}>
    //     <span> Samara, 2022 </span>
    //   </div>
  )
}

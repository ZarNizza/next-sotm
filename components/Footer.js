import Link from 'next/link'
import { useSession } from 'next-auth/react'
// import styles from '../styles/Home.module.css'
import styles from './Footer.module.scss'

export default function Footer() {
  const { data: session } = useSession()
  // return session ? (
  return (
    <div className={styles.footer}>
      <Link href="/" passHref>
        <a className={styles.footerLink}>
          <span className={styles.rb_p}>
            <div className={styles.footerLabel}>&#8962;</div>
          </span>
        </a>
      </Link>
      <Link href="/plus" passHref>
        <a className={styles.footerLink}>
          <span className={styles.rb_o}>
            <div className={styles.footerLabel}> + </div>
          </span>
        </a>
      </Link>
      <Link href="/memo" passHref>
        <a className={styles.footerLink}>
          <span className={styles.rb_y}>
            <div className={styles.footerLabel}>M</div>
          </span>
        </a>
      </Link>
      <Link href="/minus" passHref>
        <a className={styles.footerLink}>
          <span className={styles.rb_b}>
            <div className={styles.footerLabel}> – </div>
          </span>
        </a>
      </Link>
      <Link href="/statistics" passHref>
        <a className={styles.footerLink}>
          <span className={styles.rb_g}>
            <div className={styles.footerLabel}> = </div>
          </span>
        </a>
      </Link>
      <Link href="/settings" passHref>
        <a className={styles.footerLink}>
          <span className={styles.rb_pink}>
            <div className={styles.footerLabel}>Set</div>
          </span>
        </a>
      </Link>
      <Link href="/sys" passHref>
        <a className={styles.footerLink}>
          <span className={styles.rb_p}>
            <div className={styles.footerLabel}>[Sys]</div>
          </span>
        </a>
      </Link>
    </div>
  )
}

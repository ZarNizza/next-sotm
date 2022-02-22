import Link from 'next/link'
import { useSession } from 'next-auth/react'
import styles from '../styles/Home.module.css'

export default function Footer() {
  const { data: session } = useSession()
  // return session ? (
  return (
    <div className={styles.footer}>
      <Link href="/" passHref>
        <a className={styles.footerLink}>&lt;&lt; Welcome </a>
      </Link>
      <Link href="/add" passHref>
        <a className={styles.footerLink}>(+) Income</a>
      </Link>
      <Link href="/memo" passHref>
        <a className={styles.footerLink}>Memo</a>
      </Link>
      <Link href="/expenses" passHref>
        <a className={styles.footerLink}>(–) Expenses</a>
      </Link>
      <Link href="/statistics" passHref>
        <a className={styles.footerLink}>(=) Stat</a>
      </Link>
      <Link href="/settings" passHref>
        <a className={styles.footerLink}>Set</a>
      </Link>
      <Link href="/sys" passHref>
        <a className={styles.footerLink}>[System]</a>
      </Link>
    </div>
    // ) : (
    //   <div className={styles.footer}>
    //     <span> Samara, 2022 </span>
    //   </div>
  )
}

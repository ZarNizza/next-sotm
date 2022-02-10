import Link from 'next/link'
import { useSession } from 'next-auth/react'
import styles from '../styles/Home.module.css'

export default function Footer() {
  const { data: session } = useSession()
  // return session ? (
  return (
    <div className={styles.footer}>
      <Link href="/">
        <a className={styles.footerLink}>&lt;&lt;Welcome </a>
      </Link>
      <Link href="/add">
        <a className={styles.footerLink}>(+)Income</a>
      </Link>
      <Link href="/memo">
        <a className={styles.footerLink}>Memo</a>
      </Link>
      <Link href="/expenses">
        <a className={styles.footerLink}>(-)Expenses</a>
      </Link>
      <Link href="/statistics">
        <a className={styles.footerLink}>(=)Stat</a>
      </Link>
      <Link href="/settings">
        <a className={styles.footerLink}>Set</a>
      </Link>
      <Link href="/sys">
        <a className={styles.footerLink}>[System]</a>
      </Link>
    </div>
    // ) : (
    //   <div className={styles.footer}>
    //     <span> Samara, 2022 </span>
    //   </div>
  )
}

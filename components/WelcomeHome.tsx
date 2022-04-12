import Head from 'next/head'
import styles from './Home.module.scss'
import Link from 'next/link'
import WelcomeStat from './WelcomeStat'
import { AppContext } from './AppContext'
import { useContext } from 'react'
import { SVG_edit } from './SVG_edit'

export default function WelcomeHome() {
  const c = useContext(AppContext)
  return (
    <>
      <Head>
        <title>{c.t.welcomeTitle}</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.columnSpaceBetween}>
          <div className={styles.main}>
            <h1>{c.t.appName}</h1>
            <div className={styles.squareRow}>
              <Link href="/plus" passHref>
                <div className={`${styles.square} ${styles.orange}`}>
                  <p className={styles.bigFont}> + </p>
                </div>
              </Link>
              <div className={styles.squareWrapper}>
                <Link href="/memo" passHref>
                  <div className={`${styles.halfsquare_top} ${styles.yellow}`}>
                    <p>{c.t.memo}</p>
                  </div>
                </Link>
                <Link href="/minus" passHref>
                  <div className={`${styles.halfsquare_bottom} ${styles.blue}`}>
                    <p className={styles.bigFont}> – </p>
                  </div>
                </Link>
              </div>
            </div>
            <div className={styles.squareRow}>
              <Link href="/statistics" passHref>
                <div className={`${styles.square} ${styles.green}`}>
                  <p className={styles.bigFont}> = </p>
                </div>
              </Link>
              <Link href="/settings" passHref>
                <div className={`${styles.square} ${styles.violet}`}>
                  <div className={styles.pdiv}>
                    <SVG_edit />
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <WelcomeStat />
        </div>
      </main>
    </>
  )
}

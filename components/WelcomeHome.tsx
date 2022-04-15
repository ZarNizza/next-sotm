import Head from 'next/head'
import styles from './Home.module.scss'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
import WelcomeStat from './WelcomeStat'
import { AppContext } from './AppContext'
import { useContext } from 'react'
import { SVG_edit } from './SVG_edit'

export default function WelcomeHome() {
  const c = useContext(AppContext)
  let toast01: any
  if (c.u === '') {
    toast01 = toast.custom(
      (t) => (
        <button
          onClick={() => toast.remove('toast01')}
          style={{
            textAlign: 'center',
            border: '1px solid #778864',
            borderRadius: '1rem',
            padding: '7rem 3rem',
            marginTop: '7rem',
            background: '#fff'
          }}
        >
          <h1>{c.t.welcomeTitle}</h1>
          <p>
            {c.t.welcomeTips1}
            <br />
            {c.t.welcomeTips2}
            <br />
            {c.t.welcomeTips3}
            <br />
          </p>
          <p>
            {c.t.welcomeTips4}
            <br />
            {c.t.welcomeTips5}
          </p>
          <p>
            {c.t.welcomeTips6}
            <br />
            {c.t.welcomeTips7}
          </p>
          <p>. . .</p>
          <p>- {c.t.welcomeTips8} -</p>
        </button>
      ),
      { id: 'toast01', duration: 10000 }
    )
  }
  //
  return (
    <>
      <Head>
        <title>{c.t.welcomeTitle}</title>
      </Head>
      <Toaster />
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

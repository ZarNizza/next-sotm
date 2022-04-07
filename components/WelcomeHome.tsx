import Head from 'next/head'
import styles from './Home.module.scss'
import Layout from './layout'
import Link from 'next/link'
import WelcomeStat from './WelcomeStat'

export default function WelcomeHome(t: any) {
  return (
    <Layout>
      <Head>
        <title>{t.t.welcomeTitle}</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.columnSpaceBetween}>
          <div className={styles.main}>
            <h1>{t.t.appName}</h1>
            <div className={styles.squareRow}>
              <Link href="/plus" passHref>
                <div className={`${styles.square} ${styles.orange}`}>
                  <p className={styles.bigFont}> + </p>
                </div>
              </Link>
              <div className={styles.squareWrapper}>
                <Link href="/memo" passHref>
                  <div className={`${styles.halfsquare_top} ${styles.yellow}`}>
                    <p>{t.t.memo}</p>
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
                  <p>{t.t.settings}</p>
                </div>
              </Link>
            </div>
          </div>
          <WelcomeStat t={t.t} />
        </div>
      </main>
    </Layout>
  )
}

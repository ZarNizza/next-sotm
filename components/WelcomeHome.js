import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from './layout'
import Link from 'next/link'
import WelcomeStat from './WelcomeStat'

export default function WelcomeHome() {
  return (
    <Layout>
      <Head>
        <title>Welcome Home!</title>
      </Head>
      <main className={styles.main}>
        <h1>Sales and Profit</h1>
        <div className={styles.row}>
          <Link href="/plus" passHref>
            <div className={styles.square_plus}>
              <p> + </p>
            </div>
          </Link>
          <div className={styles.square0}>
            <Link href="/memo" passHref>
              <div className={styles.halfsquare_top}>
                <p>memo</p>
              </div>
            </Link>
            <Link href="/minus" passHref>
              <div className={styles.halfsquare_bottom}>
                <p> – </p>
              </div>
            </Link>
          </div>
        </div>
        <div className={styles.row}>
          <Link href="/statistics" passHref>
            <div className={styles.square_stat}>
              <p> = </p>
            </div>
          </Link>
          <Link href="/settings" passHref>
            <div className={styles.square_sys}>
              <p> Settings </p>
            </div>
          </Link>
        </div>
        <WelcomeStat />
      </main>
    </Layout>
  )
}

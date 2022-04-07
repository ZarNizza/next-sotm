import LoggedStatus from './LoggedStatus'
import Head from 'next/head'
import styles from './Home.module.scss'
import { useRouter } from 'next/router'
import { en } from '../locales/en'
import { ru } from '../locales/ru'

export default function NobodyHome() {
  const t = useRouter().locale === 'en' ? en : ru
  return (
    <>
      <Head>
        <title>{t.welcomeTitle}</title>
      </Head>
      <main className={styles.main}>
        <h3>
          Welcome to <span style={{ color: '#d0d' }}>beHappy!</span>
          SalesOnTheMove
        </h3>
        <p>
          This app help you keep in-order your incomes & payments. <br />
          Just write every event here. <br />
          You can get statistics at any time!
        </p>
        <p>
          ! Authentification with Google account works local only - because
          restrictions Google ID for this app ((( I try to fix it asap.
        </p>
        <div className={styles.loginForm}>
          <LoggedStatus />
        </div>
      </main>
    </>
  )
}

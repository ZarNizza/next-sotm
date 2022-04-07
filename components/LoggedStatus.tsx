import { useSession, signIn, signOut } from 'next-auth/react'
import styles from './Login.module.scss'
import { useRouter } from 'next/router'
import { en } from '../locales/en'
import { ru } from '../locales/ru'

export default function LoggedStatus() {
  const { data: session } = useSession()
  const router = useRouter()
  const t = router.locale === 'en' ? en : ru
  return session ? (
    <div className={styles.LoggedStatus}>
      <b>{!!session && !!session.user ? session.user.name : ''}</b>
      <button onClick={() => signOut()} className={styles.logoutButton}>
        {t.signOut}
      </button>
    </div>
  ) : (
    <div className={styles.LoggedStatus}>
      <button onClick={() => signIn()} className={styles.loginButton}>
        {t.signIn}
      </button>
    </div>
  )
}

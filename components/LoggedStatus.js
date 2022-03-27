import { useSession, signIn, signOut } from 'next-auth/react'
import styles from '../styles/Home.module.css'

export default function LoggedStatus() {
  const { data: session } = useSession()
  return session ? (
    <div className={styles.LoggedStatus}>
      <b>{session.user.name}</b>
      <button onClick={() => signOut()} className={styles.logoutButton}>
        Sign out
      </button>
    </div>
  ) : (
    <div className={styles.LoggedStatus}>
      <button onClick={() => signIn()} className={styles.loginButton}>
        LogIn with your Google account
      </button>
    </div>
  )
}

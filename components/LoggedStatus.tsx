import { useSession, signIn, signOut } from 'next-auth/react'
import styles from './Login.module.scss'
import { AppContext } from './AppContext'
import { useContext } from 'react'

export default function LoggedStatus() {
  const c = useContext(AppContext)
  const { data: session } = useSession()

  return session ? (
    <div className={styles.LoggedStatus}>
      <b>{!!session && !!session.user ? session.user.name : ''}</b>
      <button onClick={() => signOut()} className={styles.logoutButton}>
        {c.t.signOut}
      </button>
    </div>
  ) : (
    <div className={styles.LoggedStatus}>
      <button onClick={() => signIn()} className={styles.loginButton}>
        {c.t.signIn}
      </button>
    </div>
  )
}

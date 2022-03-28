import Logo from './Logo'
import LoggedStatus from './LoggedStatus'
import styles from '../styles/Home.module.css'

export default function Header() {
  return (
    <div className={styles.header}>
      <Logo />
      <LoggedStatus />
    </div>
  )
}

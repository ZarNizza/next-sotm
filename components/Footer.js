import Link from 'next/link'
import { useSession } from 'next-auth/react'
import styles from './Footer.module.scss'
import { AppContext } from './AppContext'
import { useContext } from 'react'
import { SVG_edit } from './SVG_edit'

export default function Footer() {
  const c = useContext(AppContext)
  const { data: session } = useSession()
  // return session ? (
  return (
    <div className={styles.footer}>
      <div className={styles.footerLine}>
        <span>
          <Link href="/" passHref>
            <a className={styles.footerLink}>
              <span className={styles.rb_p}>
                <div className={styles.footerLabel}>&#8962;</div>
              </span>
            </a>
          </Link>
        </span>
        <span>
          <Link href="/plus" passHref>
            <a className={styles.footerLink}>
              <span className={styles.rb_o}>
                <div className={styles.footerLabel}> + </div>
              </span>
            </a>
          </Link>
        </span>
        <span>
          <Link href="/minus" passHref>
            <a className={styles.footerLink}>
              <span className={styles.rb_b}>
                <div className={styles.footerLabel}> – </div>
              </span>
            </a>
          </Link>
        </span>
        <span>
          <Link href="/statistics" passHref>
            <a className={styles.footerLink}>
              <span className={styles.rb_g}>
                <div className={styles.footerLabel}> = </div>
              </span>
            </a>
          </Link>
        </span>
        <span>
          <Link href="/memo" passHref>
            <a className={styles.footerLink}>
              <span className={styles.rb_y}>
                <div className={`${styles.footerLabel} ${styles.thinText}`}>
                  M
                </div>
              </span>
            </a>
          </Link>
        </span>
        <span>
          <Link href="/settings" passHref>
            <a className={styles.footerLink}>
              <span className={styles.rb_pink}>
                <div className={styles.footerLabel}>
                  <SVG_edit />
                </div>
              </span>
            </a>
          </Link>
        </span>
        <span>
          <Link href="/sys" passHref>
            <a className={styles.footerLink}>
              <span className={styles.rb_p}>
                <div className={`${styles.footerLabel} ${styles.thinText}`}>
                  [Sys]
                </div>
              </span>
            </a>
          </Link>
        </span>
      </div>
    </div>
  )
}

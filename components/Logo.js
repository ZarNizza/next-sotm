import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Logo() {
  return (
    <div className={styles.rowElem}>
      <Link href="/">
        <div className={styles.logoBH}>
          <span style={{ margin: 'auto', color: 'white', fontSize: 'larger' }}>
            <p
              style={{
                textAlign: 'end',
                margin: '0.5rem 0.5rem -0.2rem 0',
                fontSize: 'small'
              }}
            >
              be
            </p>
            Happy!
            <p
              style={{
                marginLeft: '0.9rem',
                marginTop: '-0.5rem',
                fontSize: 'x-large'
              }}
            >
              &#128504;
              <span
                style={{
                  fontSize: 'x-small',
                  marginLeft: '0.9rem',
                  marginTop: '-0.95rem',
                  display: 'block',
                  position: 'relative',
                  top: '-0.4rem'
                }}
              >
                &#128504;
              </span>
            </p>
          </span>
        </div>
      </Link>
    </div>
  )
}

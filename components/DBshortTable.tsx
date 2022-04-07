import stylesH from '../styles/Home.module.css'
import styles from './Table.module.scss'
import { useRouter } from 'next/router'
import { en } from '../locales/en'
import { ru } from '../locales/ru'

type TableProps = {
  resData: Record<string, number | string | Date | null>[]
}

export default function DBshortTable(props: TableProps) {
  const t = useRouter().locale === 'en' ? en : ru
  const keys = Object.keys(props.resData[0])

  if (props.resData === undefined || props.resData.length === 0) {
    return (
      <div className={stylesH.flexColumnContainer}>
        <p>--------- s ----------</p>
        <p>- {t.db_empty} -</p>
      </div>
    )
  } else {
    return (
      <div className={stylesH.flexColumnContainer}>
        <table className={styles.TableContainer}>
          <thead>
            <tr key={Math.random()}>
              {keys.map((key) => (
                <td key={Math.random()}>{key}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.resData.map((item) => {
              const a = Object.values(item)
              return (
                <tr key={Math.random()}>
                  {Object.values(item).map((elem) => (
                    <td
                      key={Math.random()}
                      className={a[0] === null ? styles.gross : ''}
                    >
                      {typeof elem === 'number'
                        ? String(elem)
                        : a[0] === null && elem === null
                        ? t.total
                        : elem === null
                        ? ' '
                        : String(elem)}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

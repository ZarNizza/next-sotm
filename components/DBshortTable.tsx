import stylesH from '../styles/Home.module.css'
import styles from './Table.module.scss'
import { AppContext } from './AppContext'
import { useContext } from 'react'

type TableProps = {
  resData: Record<string, number | string | Date | null>[]
}

export default function DBshortTable(props: TableProps) {
  const c = useContext(AppContext)
  const keys = Object.keys(props.resData[0])

  if (props.resData === undefined || props.resData.length === 0) {
    return (
      <div className={stylesH.flexColumnContainer}>
        <p>--------- s ----------</p>
        <p>- {c.t.db_empty} -</p>
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
                  {Object.values(item).map((elem, i) => (
                    <td
                      key={Math.random()}
                      className={
                        a[0] === null
                          ? styles.gross
                          : i === 0
                          ? styles.alignLeft
                          : ''
                      }
                    >
                      {typeof elem === 'number'
                        ? String(elem)
                        : a[0] === null && elem === null
                        ? c.t.total
                        : elem === null
                        ? ' '
                        : String(elem).slice(0, 1) === '2' &&
                          String(elem).slice(10, 11) === 'T'
                        ? String(elem).slice(0, 10) +
                          ', ' +
                          String(elem).slice(11, 16)
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

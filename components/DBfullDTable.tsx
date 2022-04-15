import stylesH from '../styles/Home.module.css'
import styles from './Table.module.scss'
import type { Product } from '../pages/plus'
import { AppContext } from './AppContext'
import { useContext } from 'react'

type TableProps = {
  resData: Record<string, number | string | Date | null>[]
  products: Product[]
}

export default function DBfullDTable(props: TableProps) {
  const c = useContext(AppContext)
  const keys = Object.keys(props.resData[0])
  const nColumns = keys.length
  // console.log('nColumns=', nColumns, ' keys=', keys)

  if (props.resData === undefined || props.resData.length === 0) {
    return (
      <div className={stylesH.flexColumnContainer}>
        <p>----------fD----------</p>
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
                <td key={Math.random()}>
                  <p className={styles.vertical}>{key}</p>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.resData.map((item) => {
              return (
                <tr key={Math.random()}>
                  {Object.values(item).map((elem, i) => (
                    <td
                      key={Math.random()}
                      className={
                        item.name === null || item.symbol === null
                          ? styles.gross
                          : i === 0
                          ? styles.alignLeft
                          : ''
                      }
                    >
                      {typeof elem === 'number'
                        ? String(elem)
                        : elem === null &&
                          (item.name === null || item.symbol === null)
                        ? c.t.total
                        : elem === null
                        ? ' '
                        : String(elem).slice(0, 50)}
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

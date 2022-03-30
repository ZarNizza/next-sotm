import stylesH from '../styles/Home.module.css'
import styles from './Table.module.scss'
import type { Product } from '../pages/plus'

type TableProps = {
  resData: Record<string, number | string | Date | null>[]
  products: Product[]
}

export default function DBList(props: TableProps) {
  const keys = Object.keys(props.resData[0])
  const nColumns = keys.length

  if (props.resData === undefined || props.resData.length === 0) {
    return (
      <div className={stylesH.flexColumnContainer}>
        <p>---------- f ----------</p>
        <p>- Empty DB result -</p>
      </div>
    )
  } else {
    return (
      <div className={stylesH.flexColumnContainer}>
        <ul className={styles.TableContainer}>
          {props.resData.map((item) => {
            return (
              <li key={Math.random()}>
                {Object.values(item).map((elem) => (
                  <span
                    key={Math.random()}
                    className={
                      item.name === null || item.symbol === null
                        ? styles.gross
                        : ''
                    }
                  >
                    {typeof elem === 'number'
                      ? String(elem)
                      : String(elem).slice(0, 20)}{' '}
                    -{' '}
                  </span>
                ))}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

import stylesH from '../styles/Home.module.css'
import styles from './Table.module.scss'
import type { Product } from '../pages/plus'

type TableProps = {
  resData: Record<string, number | string | Date | null>[]
  products: Product[]
}

export default function DBfullTable(props: TableProps) {
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
        <table className={styles.TableContainer}>
          <thead>
            <tr key={Math.random()}>
              <td key={Math.random()}>Customer</td>
              {props.products.map((el) => (
                <td key={Math.random()}>{el.symbol}</td>
              ))}
              <td key={Math.random()}>Sum</td>
            </tr>
          </thead>
          <tbody>
            {props.resData.map((item) => {
              return (
                <tr key={Math.random()}>
                  {Object.values(item).map((elem) => (
                    <td
                      key={Math.random()}
                      className={
                        item.name === null || item.symbol === null
                          ? styles.gross
                          : ''
                      }
                    >
                      {typeof elem === 'number'
                        ? String(elem)
                        : elem === null &&
                          (item.name === null || item.symbol === null)
                        ? 'Total:'
                        : elem === null
                        ? ' '
                        : String(elem).slice(0, 20)}
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

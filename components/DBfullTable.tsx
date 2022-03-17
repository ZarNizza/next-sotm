import styles from '../styles/Home.module.css'
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
      <div className={styles.flexColumnContainer}>
        <p>---------- f ----------</p>
        <p>- Empty DB result -</p>
      </div>
    )
  } else {
    return (
      <div className={styles.flexColumnContainer}>
        <table>
          <thead>
            <tr key={Math.random()}>
              <td key={Math.random()}>Customer</td>
              {props.products.map((el) => (
                <td key={Math.random()}>{el.psymbol}</td>
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
                        item.cname === null || item.psymbol === null
                          ? styles.gross
                          : ''
                      }
                    >
                      {typeof elem === 'number'
                        ? String(elem)
                        : elem === null &&
                          (item.cname === null || item.psymbol === null)
                        ? 'Total:'
                        : elem === null
                        ? ' '
                        : String(elem).slice(0, 10)}
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

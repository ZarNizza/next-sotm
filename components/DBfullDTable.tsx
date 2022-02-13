import styles from '../styles/Home.module.css'
import type { Sale, Product } from '../pages/add'

type TableProps = {
  resData: Record<string, number | string | Date | null>[]
  products: Product[]
}

export default function DBfullDTable(props: TableProps) {
  const keys = Object.keys(props.resData[0])
  const nColumns = keys.length
  console.log('nColumns=', nColumns, ' keys=', keys)

  if (props.resData === undefined || props.resData.length === 0) {
    return (
      <div className={styles.flexColumnContainer}>
        <p>----------fD----------</p>
        <p>- Empty DB result -</p>
      </div>
    )
  } else {
    return (
      <div className={styles.flexColumnContainer}>
        <p>---------- fD ----------</p>
        <table>
          <thead>
            <tr key={Math.random()}>
              {keys.map((key) => (
                <td key={Math.random()}>
                  <p className={styles.vertical}>{key}</p>
                </td>
              ))}
            </tr>
            {/* <tr key={Math.random()}>
              <td key={Math.random()}>Customer</td>
              {props.products.map((el) => (
                <td key={Math.random()}>{el.psymbol}</td>
              ))}
              <td key={Math.random()}>Sum</td>
            </tr> */}
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

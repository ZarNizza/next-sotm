import styles from '../styles/Home.module.css'
import type { Sale, Product } from '../pages/add'

type TableProps = {
  resData: Record<string, number | string | Date | null>[]
}

export default function DBshortTable(props: TableProps) {
  // console.log('------------+++++++++++++++---------- resData', props.resData)
  const keys = Object.keys(props.resData[0])

  if (props.resData === undefined || props.resData.length === 0) {
    return (
      <div className={styles.flexColumnContainer}>
        <p>--------- s ----------</p>
        <p>- Empty DB result -</p>
      </div>
    )
  } else {
    return (
      <div className={styles.flexColumnContainer}>
        <p>---------- s ----------</p>
        <table>
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

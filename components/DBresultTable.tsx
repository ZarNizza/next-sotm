import styles from '../styles/Home.module.css'
import type { Sale } from '../pages/add'

interface TableProps {
  resData: Record<string, number | string | Date | null>[]
}

export default function DBresultTable(props: TableProps) {
  // console.log('------------+++++++++++++++---------- resData', props.resData)
  if (props.resData === undefined || props.resData.length === 0) {
    return (
      <div className={styles.flexColumnContainer}>
        <p>--------------------</p>
        <p>- Empty DB result -</p>
      </div>
    )
  } else {
    const keys = Object.keys(props.resData[0])
    const nColumns = keys.length
    return (
      <div className={styles.flexColumnContainer}>
        <p>--------------------</p>
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
                    <td key={Math.random()} className={item.cname === null ? styles.gross : ''}>
                      {typeof elem === 'number'
                        ? String(elem)
                        : item.cname===null && elem===null ? 'Итого:': String(elem).slice(0, 10)}
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

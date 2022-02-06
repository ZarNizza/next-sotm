import styles from '../styles/Home.module.css'
import type { Sale } from '../pages/add'

interface TableProps {
  resData: Record<string, number | string | Date | null>[]
}

export default function DBresultTable(props: TableProps) {
  // console.log('------------+++++++++++++++---------- resData', props.resData)
  if (props.resData === undefined || props.resData === []) {
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
        <p>Sales </p>
        <table>
          <thead>
            <tr>
              {keys.map((key) => (
                <td>{key}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.resData.map((item) => {
              const a = Object.values(item)
              return (
                <tr key={JSON.stringify(item)}>
                  {Object.values(item).map((elem) => (
                    <td>
                      {typeof elem === 'number'
                        ? String(elem)
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
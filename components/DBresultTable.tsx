import styles from '../styles/Home.module.css'
import type { Sale } from '../pages/add'

export default function DBresultTable(props: any) {
  if (props.resData === undefined)
    return (
      <div className={styles.flexColumnContainer}>
        <p>--------------------</p>
        <p>- Empty DB result -</p>
      </div>
    )
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
          {props.resData.map((item: Sale) => {
            const a = Object.values(item)
            return (
              <tr>
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

import styles from '../styles/Home.module.css'

type TableProps = {
  resData: Record<string, number | string | Date | null>[]
}

export default function DBshort_ED_Table(props: TableProps) {
  const keys = Object.keys(props.resData[0])

  if (props.resData === undefined || props.resData.length === 0) {
    return (
      <div className={styles.flexColumnContainer}>
        <p>--------- s e d ----------</p>
        <p>- Empty DB result -</p>
      </div>
    )
  } else {
    return (
      <div className={styles.flexColumnContainer}>
        <p>---------- s e d ----------</p>
        <table>
          <thead>
            <tr key={Math.random()}>
              {keys.map((key) => (
                <td key={Math.random()}>{key}</td>
              ))}
              <td key={Math.random()}>Edit</td>
              <td key={Math.random()}>Del</td>
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
                        : elem === null
                        ? ' '
                        : String(elem).slice(0, 10)}
                    </td>
                  ))}
                  <td key={Math.random()} className={styles.td_edit}>
                    <button> Edit </button>
                  </td>
                  <td key={Math.random()}>
                    <button className={styles.td_dropButton}> X </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

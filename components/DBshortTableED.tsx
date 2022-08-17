//
// Edit-Delete version
//
import stylesH from '../styles/Home.module.css'
import styles from './Table.module.scss'
import { AppContext } from './AppContext'
import { useContext } from 'react'
import fetchHandler, { FetchArgs } from './fetchHandler'

type TableProps = {
  resData: Record<string, number | string | Date | null>[]
  updateFunc: any
  type: 'S' | 'X'
}

export default function DBshortTableED(props: TableProps) {
  const c = useContext(AppContext)
  const keys = Object.keys(props.resData[0])

  function setDelFlag(id: any) {
    let apiName: string = ''
    let apiBody: string = ''
    apiName = props.type === 'S' ? 'sales' : 'xpenses'
    apiBody = JSON.stringify({
      mode: 'delete',
      dbPrefix: c.u,
      id: String(id)
    })

    const args: FetchArgs = {
      method: 'POST',
      apiSuffix: apiName,
      title: 'Delete',
      body: apiBody,
      setResData: console.log
    }

    fetchHandler(args)
      .then(() => {
        console.log('delete promise')
        props.updateFunc()
      })
      .catch((err) => console.log('delete promise - ', err))
  }

  function resetDelFlag(id: any) {
    let apiName: string = ''
    let apiBody: string = ''
    apiName = props.type === 'S' ? 'sales' : 'xpenses'
    apiBody = JSON.stringify({
      mode: 'restore',
      dbPrefix: c.u,
      id: String(id)
    })

    const args: FetchArgs = {
      method: 'POST',
      apiSuffix: apiName,
      title: 'Restore',
      body: apiBody,
      setResData: console.log
    }

    fetchHandler(args)
      .then(() => {
        console.log('restore promise')
        props.updateFunc()
      })
      .catch((err) => console.log('restore promise - ', err))
  }

  if (props.resData === undefined || props.resData.length === 0) {
    return (
      <div className={stylesH.flexColumnContainer}>
        <p>--------- s ----------</p>
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
                <td key={Math.random()}>{key}</td>
              ))}
              <td>X</td>
            </tr>
          </thead>
          <tbody>
            {props.resData.map((item) => {
              const a = Object.values(item)
              return (
                <tr key={Math.random()}>
                  {Object.values(item).map((elem, i) => (
                    <td
                      key={Math.random()}
                      className={
                        a[0] === null
                          ? styles.gross
                          : item.del
                          ? styles.alignLeftLowLight
                          : i === 0
                          ? styles.alignLeft
                          : ''
                      }
                    >
                      {typeof elem === 'number'
                        ? String(elem)
                        : a[0] === null && elem === null
                        ? c.t.total
                        : elem === null
                        ? ' '
                        : String(elem).slice(0, 1) === '2' &&
                          String(elem).slice(10, 11) === 'T'
                        ? String(elem).slice(0, 10) +
                          ', ' +
                          String(elem).slice(11, 16)
                        : String(elem)}
                    </td>
                  ))}
                  <td
                    className={
                      item.del ? styles.alignLeftLowLight : styles.alignLeft
                    }
                  >
                    <button
                      className={
                        item.del
                          ? styles.restoreButtonTable
                          : styles.dropButtonTable
                      }
                      onClick={() =>
                        item.del ? resetDelFlag(a[0]) : setDelFlag(a[0])
                      }
                    >
                      {item.del ? '^' : 'X'}
                    </button>
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

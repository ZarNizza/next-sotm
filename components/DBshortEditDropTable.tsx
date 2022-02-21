import { findSourceMap } from 'module'
import {
  Dispatch,
  FunctionComponentElement,
  SetStateAction,
  useEffect,
  useState
} from 'react'
import styles from '../styles/Home.module.css'
import EditForm from './EditForm'

type TableProps = {
  resData: Record<string, number | string | Date | null>[]
  target?: string
}

export default function DBshort_ED_Table(props: TableProps) {
  const [idToEdit, setIdToEdit] = useState<number>(0)
  const [itemToEdit, setItemToEdit] = useState<
    Record<string, number | string | Date | null>[]
  >([])

  const keys = Object.keys(props.resData[0])
  // const dataTitles = Array.from(Object.values(props.resData[0]))
  const idName = keys[0]
  console.log('keys=', keys, ' idName=', idName)
  let apiSuffix = ''
  switch (idName) {
    case 'cid':
      apiSuffix = 'customers'
      break
    case 'pid':
      apiSuffix = 'products'
      break
    case 'eid':
      apiSuffix = 'eitems'
      break
    case 'sid':
      apiSuffix = 'sales'
      break
    case 'xid':
      apiSuffix = 'expenses'
      break
    default:
      break
  }

  function editButtonHandler(e: any) {
    console.log(
      '**************** edit button, val=',
      e.target.value,
      ' idName=',
      idName
    )
    const iToEdit = [
      props.resData.filter((item) => {
        return item[String(idName)] === Number(e.target.value)
      })[0]
    ]
    setItemToEdit(() => iToEdit)
    console.log('-------------- iToEdit=', iToEdit)
    console.log('============== itemToEdit=', itemToEdit)
    setIdToEdit(() => e.target.value)
  }

  function dropButtonHandler(e: any) {
    console.log('**************** drop button, val=', e.target.value)
  }

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
        {idToEdit === 0 ? null : (
          <EditForm
            setIdToEdit={setIdToEdit}
            idName={idName}
            keys={keys}
            itemToEdit={itemToEdit}
            // setItemToEdit={setItemToEdit}
          />
        )}
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
                  {a.map((elem) => (
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
                    <button value={String(a[0])} onClick={editButtonHandler}>
                      {' '}
                      Edit{' '}
                    </button>
                  </td>
                  <td key={Math.random()}>
                    <button
                      className={styles.td_dropButton}
                      value={String(a[0])}
                      onClick={dropButtonHandler}
                    >
                      {' '}
                      X{' '}
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

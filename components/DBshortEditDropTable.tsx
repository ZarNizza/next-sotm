import { findSourceMap } from 'module'
import { FunctionComponentElement, useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

type TableProps = {
  resData: Record<string, number | string | Date | null>[]
  target?: string
}

export default function DBshort_ED_Table(props: TableProps) {
  const keys = Object.keys(props.resData[0])
  const [idToEdit, setIdToEdit] = useState<number>(0)

  function editButtonHandler(e: any) {
    console.log('**************** edit button, val=', e.target.value)
    setIdToEdit(() => e.target.value)
  }

  function dropButtonHandler(e: any) {
    console.log('**************** drop button, val=', e.target.value)
  }

  function saveEdit() {
    setIdToEdit(() => 0)
  }
  function cancelEdit() {
    setIdToEdit(() => 0)
  }

  function EditForm() {
    function inputChangeHandler() {
      console.log('inChHandler')
    }

    let itemToEdit = props.resData.filter((item) => {
      return item.cid === Number(idToEdit)
    })[0]
    console.log('============== itemToEdit=', itemToEdit)
    return (
      <div className={styles.editForm}>
        <p>{props.target}</p>
        <input
          type="text"
          value={String(itemToEdit.cname)}
          onChange={inputChangeHandler}
        />
        <input
          type="text"
          value={String(itemToEdit.cphone)}
          onChange={inputChangeHandler}
        />
        <input
          type="text"
          value={String(itemToEdit.gooid)}
          onChange={inputChangeHandler}
        />
        <p> </p>
        <div className={styles.flexRowContainer}>
          <button className={styles.sysButton} onClick={saveEdit}>
            Save
          </button>
          <button className={styles.sysButton} onClick={cancelEdit}>
            Cancel
          </button>
        </div>
      </div>
    )
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
        {idToEdit === 0 ? '' : <EditForm />}
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

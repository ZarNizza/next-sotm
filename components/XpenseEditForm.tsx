import { useState } from 'react'
import { Xpense } from '../pages/minus'
import styles from '../styles/Home.module.css'
import fetchHandler, { FetchArgs } from './fetchHandler'

type editFormArgs = {
  xpenseToEdit: Xpense
  setUpdateFlag: any
  cancelFlag: any
}

export default function XpenseEditForm(a: editFormArgs) {
  const [xDate, setXdate] = useState(a.xpenseToEdit.date.slice(0, 10))
  const [xItem, setXitem] = useState(a.xpenseToEdit.xitem)
  const [xSum, setXsum] = useState(a.xpenseToEdit.sum)

  function saveEditHandler() {
    const args: FetchArgs = {
      method: 'POST',
      apiSuffix: 'xpenses',
      title: 'edit-X',
      body: JSON.stringify({
        mode: 'edit',
        date: xDate,
        xitem: xItem,
        sum: xSum,
        id: a.xpenseToEdit.id
      }),
      setResData: a.setUpdateFlag
    }
    fetchHandler(args)
  }

  function cancelHandler() {
    return a.cancelFlag()
  }

  return (
    <div className={styles.newXeditForm}>
      <p className={styles.title}>Edit Xpense Item</p>
      <div className={styles.sysButtons}>
        Date:
        <input
          type="text"
          className={styles.userInput}
          placeholder="Name"
          pattern="[a-zA-Zа-яА-Я\s\-\d]{1,50}"
          value={xDate}
          onChange={(event) =>
            setXdate(event.target.value.replace(/[^a-zA-Zа-яА-Я\-\s\d]/gi, ''))
          }
        />
      </div>
      <div className={styles.sysButtons}>
        Item:
        <input
          type="text"
          className={styles.userInput}
          placeholder="xxxx"
          pattern="^[\d]{0,20}"
          value={xItem || ''}
          onChange={(event) =>
            setXitem(Number(event.target.value.replace(/[^\d]/g, '')))
          }
        />
      </div>
      <div className={styles.sysButtons}>
        Sum:
        <input
          type="text"
          className={styles.userInput}
          placeholder="xxxx"
          pattern="^[\d]{0,20}"
          value={xSum || ''}
          onChange={(event) =>
            setXsum(Number(event.target.value.replace(/[^\d]/g, '')))
          }
        />
      </div>

      <div>
        <span className={styles.sysButtons}>
          <button onClick={saveEditHandler}> Update Item </button>
        </span>
        <button onClick={cancelHandler} className={styles.dropButton}>
          X
        </button>
      </div>
    </div>
  )
}

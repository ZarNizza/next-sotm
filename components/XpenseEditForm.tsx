import { useState } from 'react'
import { Xpense } from '../pages/minus'
import styles from './Select.module.scss'
import stylesH from '../styles/Home.module.css'
import fetchHandler, { FetchArgs } from './fetchHandler'

type editFormArgs = {
  xpenseToEdit: Xpense
  setUpdateFlag: any
  cancelFlag: any
}

export default function XpenseEditForm(a: editFormArgs) {
  const [xDate, setXdate] = useState(a.xpenseToEdit.xdate.slice(0, 10))
  const [xItem, setXitem] = useState(a.xpenseToEdit.xitem)
  const [xSum, setXsum] = useState(a.xpenseToEdit.xsum)

  function saveEditHandler() {
    const args: FetchArgs = {
      method: 'POST',
      apiSuffix: 'expenses',
      title: 'edit-X',
      body: JSON.stringify({
        mode: 'edit',
        xdate: xDate,
        xitem: xItem,
        xsum: xSum,
        xid: a.xpenseToEdit.xid
      }),
      setResData: a.setUpdateFlag
    }
    fetchHandler(args)
  }

  function cancelHandler() {
    return a.cancelFlag()
  }

  return (
    <div className={styles.flexColumnContainer}>
      <p>Edit Xpense</p>
      <p>
        Date:
        <input
          type="text"
          className={styles.inputCust}
          placeholder="Name"
          pattern="[a-zA-Zа-яА-Я\s\-\d]{1,50}"
          value={xDate}
          onChange={(event) =>
            setXdate(event.target.value.replace(/[^a-zA-Zа-яА-Я\-\s\d]/gi, ''))
          }
        />
      </p>
      <p>
        {' '}
        Item:
        <input
          type="text"
          className={styles.inputCust}
          placeholder="xxxx"
          pattern="^[\d]{0,20}"
          value={xItem || ''}
          onChange={(event) =>
            setXitem(Number(event.target.value.replace(/[^\d]/g, '')))
          }
        />
      </p>
      <p>
        {' '}
        Sum:
        <input
          type="text"
          className={styles.inputCust}
          placeholder="xxxx"
          pattern="^[\d]{0,20}"
          value={xSum || ''}
          onChange={(event) =>
            setXsum(Number(event.target.value.replace(/[^\d]/g, '')))
          }
        />
      </p>

      <div className={stylesH.flexRowContainer}>
        <button onClick={saveEditHandler} className={stylesH.sysButton}>
          Save
        </button>
        <button onClick={cancelHandler} className={stylesH.sysButton}>
          Cancel
        </button>
      </div>
    </div>
  )
}

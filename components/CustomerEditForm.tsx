import { Dispatch, SetStateAction, useState } from 'react'
import { Customer } from '../pages/add'
import styles from './CustomerSelect.module.scss'
import stylesH from '../styles/Home.module.css'
import fetchHandler, { FetchArgs } from './fetchHandler'
type editFormArgs = {
  custToEdit: Customer
  setUpdateFlag: any
  cancelFlag: any
}

export default function CustomerEditForm(a: editFormArgs) {
  const [custName, setCustName] = useState(a.custToEdit.cname)
  const [custPhone, setCustPhone] = useState(a.custToEdit.cphone)

  function saveEditHandler() {
    const args: FetchArgs = {
      method: 'POST',
      apiSuffix: 'customers',
      title: 'editCust',
      body: JSON.stringify({
        mode: 'edit',
        cname: custName,
        cphone: custPhone,
        gooid: a.custToEdit.gooid,
        cid: a.custToEdit.cid
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
      <p>
        Name:
        <input
          type="text"
          className={styles.inputCust}
          placeholder="Name"
          pattern="[a-zA-Zа-яА-Я\s\-]{1,50}"
          value={custName}
          onChange={(event) =>
            setCustName(event.target.value.replace(/[^a-zA-Zа-яА-Я\-\s]/gi, ''))
          }
        />
      </p>
      <p>
        {' '}
        Phone:
        <input
          type="text"
          className={styles.inputCust}
          placeholder="+x xxx xxx xxxx, xxxx"
          pattern="^\+?[\d\s\-]{0,20}"
          value={custPhone || ''}
          onChange={(event) =>
            setCustPhone(event.target.value.replace(/[^\d\-\+\s]/g, ''))
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
import { useState } from 'react'
import { Customer } from '../pages/plus'
import styles from './Select.module.scss'
import stylesH from '../styles/Home.module.css'
import fetchHandler, { FetchArgs } from './fetchHandler'

type editFormArgs = {
  itemToEdit: Customer
  updateFunc: any
  resetParams: any
}

export default function CustomerEditForm(a: editFormArgs) {
  const [custName, setCustName] = useState(a.itemToEdit.name)
  const [custPhone, setCustPhone] = useState(a.itemToEdit.phone)

  function saveEditHandler() {
    const args: FetchArgs = {
      method: 'POST',
      apiSuffix: 'customers',
      title: 'editCust',
      body: JSON.stringify({
        mode: 'edit',
        name: custName,
        phone: custPhone,
        gooid: a.itemToEdit.gooid,
        id: a.itemToEdit.id
      }),
      setResData: console.log
    }

    fetchHandler(args)
      .then(() => {
        console.log('update promise')
        a.updateFunc()
      })
      .catch((err) => console.log('update promise - ', err))
  }

  return (
    <div className={stylesH.newCeditForm}>
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
        <button onClick={() => a.resetParams()} className={stylesH.sysButton}>
          Cancel
        </button>
      </div>
    </div>
  )
}

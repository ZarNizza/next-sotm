import { useState } from 'react'
import { Sale } from '../pages/plus'
import styles from './CustomerSelect.module.scss'
import stylesH from '../styles/Home.module.css'
import fetchHandler, { FetchArgs } from './fetchHandler'

type editFormArgs = {
  saleToEdit: Sale
  setUpdateFlag: any
  cancelFlag: any
}

export default function SaleEditForm(a: editFormArgs) {
  const [sDate, setSdate] = useState(a.saleToEdit.sdate.slice(0, 10))
  const [sCust, setScust] = useState(a.saleToEdit.cust)
  const [sProd, setSprod] = useState(a.saleToEdit.prod)
  const [sSum, setSsum] = useState(a.saleToEdit.sum)

  function saveEditHandler() {
    const args: FetchArgs = {
      method: 'POST',
      apiSuffix: 'sales',
      title: 'edit-S',
      body: JSON.stringify({
        mode: 'edit',
        sdate: sDate,
        cust: sCust,
        prod: sProd,
        sum: sSum,
        sid: a.saleToEdit.sid
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
        Date:
        <input
          type="text"
          className={styles.inputCust}
          placeholder="Name"
          pattern="[a-zA-Zа-яА-Я\s\-\d]{1,50}"
          value={sDate}
          onChange={(event) =>
            setSdate(event.target.value.replace(/[^a-zA-Zа-яА-Я\-\s\d]/gi, ''))
          }
        />
      </p>
      <p>
        {' '}
        Cust:
        <input
          type="text"
          className={styles.inputCust}
          placeholder="xxxx"
          pattern="^[\d]{0,20}"
          value={sCust || ''}
          onChange={(event) =>
            setScust(Number(event.target.value.replace(/[^\d]/g, '')))
          }
        />
      </p>
      <p>
        {' '}
        Prod:
        <input
          type="text"
          className={styles.inputCust}
          placeholder="xxxx"
          pattern="^[\d]{0,20}"
          value={sProd || ''}
          onChange={(event) =>
            setSprod(Number(event.target.value.replace(/[^\d]/g, '')))
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
          value={sSum || ''}
          onChange={(event) =>
            setSsum(Number(event.target.value.replace(/[^\d]/g, '')))
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

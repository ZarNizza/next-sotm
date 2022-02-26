import { useState } from 'react'
import { Eitem } from '../pages/minus'
import styles from './CustomerSelect.module.scss'
import stylesH from '../styles/Home.module.css'
import fetchHandler, { FetchArgs } from './fetchHandler'
type editFormArgs = {
  eitemToEdit: Eitem
  setUpdateFlag: any
  cancelFlag: any
}

export default function EitemEditForm(a: editFormArgs) {
  const [eName, setEName] = useState(a.eitemToEdit.ename)
  const [eSymbol, setEsymbol] = useState(a.eitemToEdit.esymbol)

  function saveEditHandler() {
    const args: FetchArgs = {
      method: 'POST',
      apiSuffix: 'eitems',
      title: 'edit-E',
      body: JSON.stringify({
        mode: 'edit',
        ename: eName,
        esymbol: eSymbol,
        eid: a.eitemToEdit.eid
      }),
      setResData: a.setUpdateFlag
    }
    fetchHandler(args)
  }

  function cancelHandler() {
    return a.cancelFlag()
  }

  return (
    <div className={stylesH.flexColumnContainer}>
      <p>
        Name:
        <input
          type="text"
          className={styles.inputCust}
          placeholder="Name"
          pattern="[a-zA-Zа-яА-Я\s\-]{1,50}"
          value={eName}
          onChange={(event) =>
            setEName(event.target.value.replace(/[^a-zA-Zа-яА-Я\-\s]/gi, ''))
          }
        />
      </p>
      <p>
        {' '}
        Symbol:
        <input
          type="text"
          className={styles.inputCust}
          placeholder="up to 7 symbols"
          pattern="[a-zA-Zа-яА-Я\d\s\-\.,:]*"
          value={eSymbol || ''}
          onChange={(event) =>
            setEsymbol(
              event.target.value.replace(/[^a-zA-Zа-яА-Я\d\s\-\.\,\:\_]/gi, '')
            )
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

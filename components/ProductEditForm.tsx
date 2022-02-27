import { useState } from 'react'
import { Product } from '../pages/plus'
import styles from './Select.module.scss'
import stylesH from '../styles/Home.module.css'
import fetchHandler, { FetchArgs } from './fetchHandler'
type editFormArgs = {
  productToEdit: Product
  setUpdateFlag: any
  cancelFlag: any
}

export default function ProductEditForm(a: editFormArgs) {
  const [pName, setPName] = useState(a.productToEdit.pname)
  const [pSymbol, setPsymbol] = useState(a.productToEdit.psymbol)

  function saveEditHandler() {
    const args: FetchArgs = {
      method: 'POST',
      apiSuffix: 'products',
      title: 'edit-P',
      body: JSON.stringify({
        mode: 'edit',
        pname: pName,
        psymbol: pSymbol,
        pid: a.productToEdit.pid
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
          pattern="[a-zA-Zа-яА-Я\d\s\-\+\.,:]*"
          value={pName}
          onChange={(event) =>
            setPName(
              event.target.value.replace(/[^a-zA-Zа-яА-Я\d\s\-\+\.\,\:]/gi, '')
            )
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
          pattern="[a-zA-Zа-яА-Я\d\s\-\+\.,:]*"
          value={pSymbol || ''}
          onChange={(event) =>
            setPsymbol(
              event.target.value.replace(
                /[^a-zA-Zа-яА-Я\d\s\-\+\.\,\:\_]/gi,
                ''
              )
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

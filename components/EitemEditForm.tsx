import { Dispatch, SetStateAction, useState } from 'react'
import { Eitem } from '../pages/minus'
import stylesH from '../styles/Home.module.css'
import styles from './Select.module.scss'

type editEitemArgs = {
  itemToEdit: Eitem
  setItems: Dispatch<SetStateAction<Eitem[]>>
  setCurrItem: Dispatch<SetStateAction<number>>
}

export default function EitemEditForm(arg: editEitemArgs) {
  const [eName, setEitem] = useState(arg.itemToEdit.name)
  const [eSymbol, setEsymbol] = useState(arg.itemToEdit.symbol)

  function upd_E_handler() {
    if (eName === '' || eSymbol === '') {
      alert('! empty field !')
      arg.setCurrItem(0)
      return
    }
    const eitem = {
      mode: 'edit',
      name: eName,
      symbol: eSymbol,
      id: arg.itemToEdit.id
    }
    fetch('/api/eitems', {
      method: 'POST',
      body: JSON.stringify(eitem)
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          alert('newEitem ERROR: ' + res.error)
        } else {
          console.log('newEitem = OK')
          setEitem('')
          setEsymbol('')
          arg.setCurrItem(0)
        }
      })
      .then(() => {
        fetch('api/eitems')
          .then((res) => res.json())
          .then((res) => {
            if (res.error) {
              alert('newEitem reInit ERROR: ' + res.error)
            } else {
              console.log('newEitem reInit = OK')
              arg.setItems(() => res.data)
            }
          })
      })
      .catch((error) => alert('! newEitem error - ' + error.message))
  }

  function input_Ename_ChHandler(eName: string) {
    setEitem(eName.replace(/[^a-zA-Zа-яА-Я\d\s\-\+\.\,\:\_]/gi, ''))
  }

  function input_Esymbol_ChHandler(eSymbol: string) {
    setEsymbol(eSymbol.replace(/[^a-zA-Zа-яА-Я\d\s\-\+\.\,\:\_]/gi, ''))
  }

  function dropButtonHandler() {
    arg.setCurrItem(0)
  }

  return (
    <div className={styles.floatWrapper}>
      <div className={styles.newEeditForm}>
        <p className={styles.title}>Edit Expense Item</p>
        <p>
          <input
            id="eInput"
            value={eName}
            onChange={(event) => input_Ename_ChHandler(event.target.value)}
            placeholder="Item description"
            pattern="[a-zA-Zа-яА-Я\d\s\-\+\.,:_]*"
            className={styles.inputE}
          />
        </p>
        <p>
          <input
            id="eSymbolInput"
            value={eSymbol}
            onChange={(event) => input_Esymbol_ChHandler(event.target.value)}
            placeholder="ShrtNam"
            pattern="[a-zA-Zа-яА-Я\d\s\-\+\.,:_]*"
            className={styles.inputE}
          />
        </p>
        <p className={styles.flexRow}>
          <button onClick={upd_E_handler} className={stylesH.sysButton}>
            <b>Update</b>
          </button>
          <button onClick={dropButtonHandler} className={stylesH.sysButton}>
            Cancel
          </button>
        </p>
      </div>
    </div>
  )
}

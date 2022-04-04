import { Dispatch, SetStateAction, useState } from 'react'
import { Eitem } from '../pages/minus'
import stylesH from '../styles/Home.module.css'
import styles from './Select.module.scss'

type newEitemArgs = {
  setItems: Dispatch<SetStateAction<Eitem[]>>
  setNewFlag: Dispatch<SetStateAction<boolean>>
  setCurrItem?: Dispatch<SetStateAction<number>>
}

export default function EitemNew(arg: newEitemArgs) {
  const [eItem, setEitem] = useState('')
  const [eSymbol, setEsymbol] = useState('')
  if (!!arg.setCurrItem) arg.setCurrItem(() => 0)

  function add_E_handler() {
    if (eItem === '' || eSymbol === '') {
      alert('! empty field !')
      arg.setNewFlag(false)
      return
    }
    const eitem = { mode: 'new', name: eItem, symbol: eSymbol }
    fetch('/api/eitems', {
      method: 'POST',
      body: JSON.stringify(eitem)
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          alert('newEitem ERROR: ' + res.error)
        } else {
          console.log('newEitem = OK', res)
          setEitem('')
          setEsymbol('')
          arg.setNewFlag(false)
        }
      })
      .then(() => {
        fetch('api/eitems')
          .then((res) => res.json())
          .then((res) => {
            if (res.error) {
              alert('newEitem reInit ERROR: ' + res.error)
            } else {
              console.log('newEitem reInit = OK', res)
              arg.setItems(() => res.data)
            }
          })
      })
      .catch((error) => alert('! newEitem error - ' + error.message))
  }

  function input_E_ChHandler(eName: string) {
    setEitem(eName.replace(/[^a-zA-Zа-яА-Я\d\s\-\+\.\,\:\_]/gi, ''))
  }

  function input_Esymbol_ChHandler(eSymbol: string) {
    setEsymbol(eSymbol.replace(/[^a-zA-Zа-яА-Я\d\s\-\+\.\,\:\_]/gi, ''))
  }

  function dropButtonHandler() {
    arg.setNewFlag(false)
  }

  return (
    <div className={styles.floatWrapper}>
      <div className={styles.newEeditForm}>
        <p className={styles.title}>New Expense Item</p>
        <p>
          <input
            id="eInput"
            value={eItem}
            onChange={(event) => input_E_ChHandler(event.target.value)}
            placeholder="Item description"
            pattern="[a-zA-Zа-яА-Я\d\s\-\+\.,:_]*"
            className={styles.inputP}
          />
        </p>
        <p>
          <input
            id="eSymbolInput"
            value={eSymbol}
            onChange={(event) => input_Esymbol_ChHandler(event.target.value)}
            placeholder="ShrtNam"
            pattern="[a-zA-Zа-яА-Я\d\s\-\+\.,:_]*"
            className={styles.inputP}
          />
        </p>
        <p className={styles.flexRow}>
          <button onClick={add_E_handler} className={stylesH.sysButton}>
            <b>Save</b>
          </button>
          <button onClick={dropButtonHandler} className={stylesH.sysButton}>
            Cancel
          </button>
        </p>
      </div>
    </div>
  )
}

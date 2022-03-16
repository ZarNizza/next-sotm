import { Dispatch, SetStateAction, useState } from 'react'
import { Eitem } from '../pages/minus'
import styles from '../styles/Home.module.css'
import stylesC from './Select.module.scss'

type newEitemArgs = {
  setEitems: Dispatch<SetStateAction<Eitem[]>>
  setNewFlag: Dispatch<SetStateAction<boolean>>
}

export default function NewEitem(args: newEitemArgs) {
  const [eItem, setEitem] = useState('')
  const [eSymbol, setEsymbol] = useState('')

  function add_E_handler() {
    if (eItem === '' || eSymbol === '') {
      alert('! empty field !')
      args.setNewFlag(false)
      return
    }
    const eitem = { mode: 'new', ename: eItem, esymbol: eSymbol }
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
          args.setNewFlag(false)
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
              args.setEitems(() => res.data)
            }
          })
      })
      .catch((error) => alert('! newEitem error - ' + error.message))
  }

  function input_E_ChHandler(eName: string) {
    setEitem(eName.replace(/[^a-zA-Zа-яА-Я\d\s\-\.\,\:]/gi, ''))
  }

  function input_Esymbol_ChHandler(eSymbol: string) {
    setEsymbol(eSymbol.replace(/[^a-zA-Zа-яА-Я\d\s\-\.\,\:\_]/gi, ''))
  }

  function dropButtonHandler() {
    args.setNewFlag(false)
  }

  return (
    <div className={stylesC.custList}>
      <p className={styles.title}>New Expense Item</p>
      <div className={styles.sysButtons}>
        <input
          id="eInput"
          value={eItem}
          onChange={(event) => input_E_ChHandler(event.target.value)}
          placeholder="Item description"
          pattern="[a-zA-Zа-яА-Я\d\s\-\.,:]*"
          className={styles.userInput}
        />
      </div>
      <div className={styles.sysButtons}>
        <input
          id="eSymbolInput"
          value={eSymbol}
          onChange={(event) => input_Esymbol_ChHandler(event.target.value)}
          placeholder="ShrtNam"
          pattern="[a-zA-Zа-яА-Я\d\s\-\.,:]*"
          className={styles.userInput}
        />
      </div>
      <div>
        <span className={styles.sysButtons}>
          <button onClick={add_E_handler}> + add new Item </button>
        </span>
        <button onClick={dropButtonHandler} className={styles.dropButton}>
          X
        </button>
      </div>
    </div>
  )
}

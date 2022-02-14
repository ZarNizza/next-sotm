import { Dispatch, SetStateAction, useState } from 'react'
import { Eitem } from '../pages/expenses'
import styles from '../styles/Home.module.css'

export default function NewEitem() {
  const [eItem, setEitem] = useState('')
  const [eSymbol, setEsymbol] = useState('')
  function add_E_handler() {
    const eitem = { ename: eItem, esymbol: eSymbol }
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
        }
      })
      .catch((error) => alert('! newEitem error - ' + error.message))
  }
  function input_E_ChHandler(eName: string) {
    setEitem(eName.replace(/[^a-zA-Zа-яА-Я\d\s\-\.\,\:]/gi, ''))
  }
  function input_Esymbol_ChHandler(eSymbol: string) {
    setEsymbol(eSymbol.replace(/[^a-zA-Zа-яА-Я\d\s\-\.\,\:\_]/gi, ''))
  }

  return (
    <div className={styles.sysButtons}>
      <input
        id="eInput"
        value={eItem}
        onChange={(event) => input_E_ChHandler(event.target.value)}
        placeholder="New item description"
        pattern="[a-zA-Zа-яА-Я\d\s\-\.,:]*"
        className={styles.userInput}
      />
      <input
        id="eSymbolInput"
        value={eSymbol}
        onChange={(event) => input_Esymbol_ChHandler(event.target.value)}
        placeholder="ShrtDescr(max7symb)"
        pattern="[a-zA-Zа-яА-Я\d\s\-\.,:]*"
        className={styles.userInput}
      />
      <button onClick={add_E_handler}> + add new Item </button>
    </div>
  )
}

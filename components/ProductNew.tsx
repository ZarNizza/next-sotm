import { Dispatch, SetStateAction, useState } from 'react'
import { Product } from '../pages/plus'
import styles from '../styles/Home.module.css'

type newProductArgs = {
  setPitems: Dispatch<SetStateAction<Product[]>>
  setNewFlag: Dispatch<SetStateAction<boolean>>
  setCurrPitem?: Dispatch<SetStateAction<number>>
}

export default function PitemNew(arg: newProductArgs) {
  const [pItem, setPitem] = useState('')
  const [pSymbol, setPsymbol] = useState('')
  if (!!arg.setCurrPitem) arg.setCurrPitem(() => 0)

  function add_P_handler() {
    if (pItem === '' || pSymbol === '') {
      alert('! empty field !')
      arg.setNewFlag(false)
      return
    }
    const pitem = { mode: 'new', name: pItem, symbol: pSymbol }
    fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify(pitem)
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          alert('newPitem ERROR: ' + res.error)
        } else {
          console.log('newPitem = OK', res)
          setPitem('')
          setPsymbol('')
          arg.setNewFlag(false)
        }
      })
      .then(() => {
        fetch('api/products')
          .then((res) => res.json())
          .then((res) => {
            if (res.error) {
              alert('newPitem reInit ERROR: ' + res.error)
            } else {
              console.log('newPitem reInit = OK', res)
              arg.setPitems(() => res.data)
            }
          })
      })
      .catch((error) => alert('! newPitem error - ' + error.message))
  }

  function input_P_ChHandler(pName: string) {
    setPitem(pName.replace(/[^a-zA-Zа-яА-Я\d\s\-\.\,\:]/gi, ''))
  }

  function input_Psymbol_ChHandler(pSymbol: string) {
    setPsymbol(pSymbol.replace(/[^a-zA-Zа-яА-Я\d\s\-\.\,\:\_]/gi, ''))
  }

  function dropButtonHandler() {
    arg.setNewFlag(false)
  }

  return (
    <div className={styles.newForm}>
      <p className={styles.title}>New Product Item</p>
      <div className={styles.sysButtons}>
        <input
          id="pInput"
          value={pItem}
          onChange={(event) => input_P_ChHandler(event.target.value)}
          placeholder="Item description"
          pattern="[a-zA-Zа-яА-Я\d\s\-\.,:]*"
          className={styles.userInput}
        />
      </div>
      <div className={styles.sysButtons}>
        <input
          id="pSymbolInput"
          value={pSymbol}
          onChange={(event) => input_Psymbol_ChHandler(event.target.value)}
          placeholder="ShrtNam"
          pattern="[a-zA-Zа-яА-Я\d\s\-\.,:]*"
          className={styles.userInput}
        />
      </div>
      <div>
        <span className={styles.sysButtons}>
          <button onClick={add_P_handler}> + add new Item </button>
        </span>
        <button onClick={dropButtonHandler} className={styles.dropButton}>
          X
        </button>
      </div>
    </div>
  )
}
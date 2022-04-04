import { Dispatch, SetStateAction, useState } from 'react'
import { Product } from '../pages/plus'
import stylesH from '../styles/Home.module.css'
import styles from './Select.module.scss'

type newProductArgs = {
  setItems: Dispatch<SetStateAction<Product[]>>
  setNewFlag: Dispatch<SetStateAction<boolean>>
  setCurrItem?: Dispatch<SetStateAction<number>>
}

export default function PitemNew(arg: newProductArgs) {
  const [pItem, setPitem] = useState('')
  const [pSymbol, setPsymbol] = useState('')
  if (!!arg.setCurrItem) arg.setCurrItem(() => 0)

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
              arg.setItems(() => res.data)
              localStorage.setItem('products', JSON.stringify(res.data))
            }
          })
      })
      .catch((error) => alert('! newPitem error - ' + error.message))
  }

  function input_P_ChHandler(pName: string) {
    setPitem(pName.replace(/[^a-zA-Zа-яА-Я\d\s\-\+\.\,\:\_]/gi, ''))
  }

  function input_Psymbol_ChHandler(pSymbol: string) {
    setPsymbol(pSymbol.replace(/[^a-zA-Zа-яА-Я\d\s\-\+\.\,\:\_]/gi, ''))
  }

  function dropButtonHandler() {
    arg.setNewFlag(false)
  }

  return (
    <div className={styles.floatWrapper}>
      <div className={styles.newPeditForm}>
        <p className={styles.title}>New Product Item</p>
        <p>
          <input
            id="pInput"
            value={pItem}
            onChange={(event) => input_P_ChHandler(event.target.value)}
            placeholder="Item description"
            pattern="[a-zA-Zа-яА-Я\d\s\-\+\.,:_]*"
            className={styles.inputP}
          />
        </p>
        <p>
          <input
            id="pSymbolInput"
            value={pSymbol}
            onChange={(event) => input_Psymbol_ChHandler(event.target.value)}
            placeholder="ShrtNam"
            pattern="[a-zA-Zа-яА-Я\d\s\-\+\.,:_]*"
            className={styles.inputP}
          />
        </p>
        <p className={styles.flexRow}>
          <button onClick={add_P_handler} className={stylesH.sysButton}>
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

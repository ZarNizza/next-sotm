import { Dispatch, SetStateAction, useState } from 'react'
import { Product } from '../pages/plus'
import styles from '../styles/Home.module.css'

type editPitemArgs = {
  itemToEdit: Product
  setPitems: Dispatch<SetStateAction<Product[]>>
  setCurrPitem: Dispatch<SetStateAction<number>>
}

export default function ProductEditForm(arg: editPitemArgs) {
  const [pName, setPitem] = useState(arg.itemToEdit.pname)
  const [pSymbol, setPsymbol] = useState(arg.itemToEdit.psymbol)

  function upd_P_handler() {
    if (pName === '' || pSymbol === '') {
      alert('! empty field !')
      arg.setCurrPitem(0)
      return
    }
    const pitem = {
      mode: 'edit',
      pname: pName,
      psymbol: pSymbol,
      pid: arg.itemToEdit.pid
    }
    fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify(pitem)
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          alert('newPitem ERROR: ' + res.error)
        } else {
          console.log('newPitem = OK')
          setPitem('')
          setPsymbol('')
          arg.setCurrPitem(0)
        }
      })
      .then(() => {
        fetch('api/products')
          .then((res) => res.json())
          .then((res) => {
            if (res.error) {
              alert('newPitem reInit ERROR: ' + res.error)
            } else {
              console.log('newPitem reInit = OK')
              arg.setPitems(() => res.data)
            }
          })
      })
      .catch((error) => alert('! newPitem error - ' + error.message))
  }

  function input_Pname_ChHandler(pName: string) {
    setPitem(pName.replace(/[^a-zA-Zа-яА-Я\d\s\-\.\,\:]/gi, ''))
  }

  function input_Psymbol_ChHandler(pSymbol: string) {
    setPsymbol(pSymbol.replace(/[^a-zA-Zа-яА-Я\d\s\-\.\,\:\_]/gi, ''))
  }

  function dropButtonHandler() {
    arg.setCurrPitem(0)
  }

  return (
    <div className={styles.newPeditForm}>
      <p className={styles.title}>Edit Product Item</p>
      <div className={styles.sysButtons}>
        <input
          id="pInput"
          value={pName}
          onChange={(event) => input_Pname_ChHandler(event.target.value)}
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
          <button onClick={upd_P_handler}> Update Item </button>
        </span>
        <button onClick={dropButtonHandler} className={styles.dropButton}>
          X
        </button>
      </div>
    </div>
  )
}

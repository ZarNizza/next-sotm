import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Eitem } from '../pages/minus'
import styles from '../styles/Home.module.css'

type editEitemArgs = {
  itemToEdit: Eitem
  setEitems: Dispatch<SetStateAction<Eitem[]>>
  setUpdFlag: Dispatch<SetStateAction<boolean>>
}

export default function EitemEditForm(a: editEitemArgs) {
  const [eName, setEitem] = useState(a.itemToEdit.ename)
  const [eSymbol, setEsymbol] = useState(a.itemToEdit.esymbol)

  function upd_E_handler() {
    if (eName === '' || eSymbol === '') {
      alert('! empty field !')
      a.setUpdFlag(false)
      return
    }
    const eitem = {
      mode: 'edit',
      ename: eName,
      esymbol: eSymbol,
      eid: a.itemToEdit.eid
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
          a.setUpdFlag(false)
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
              a.setEitems(() => res.data)
            }
          })
      })
      .catch((error) => alert('! newEitem error - ' + error.message))
  }

  function input_Ename_ChHandler(eName: string) {
    setEitem(eName.replace(/[^a-zA-Zа-яА-Я\d\s\-\.\,\:]/gi, ''))
  }

  function input_Esymbol_ChHandler(eSymbol: string) {
    setEsymbol(eSymbol.replace(/[^a-zA-Zа-яА-Я\d\s\-\.\,\:\_]/gi, ''))
  }

  function dropButtonHandler() {
    a.setUpdFlag(false)
  }

  return (
    <div className={styles.blurBg}>
      <div className={styles.newForm}>
        <p className={styles.title}>Edit Expense Item</p>
        <div className={styles.sysButtons}>
          <input
            id="eInput"
            value={eName}
            onChange={(event) => input_Ename_ChHandler(event.target.value)}
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
            <button onClick={upd_E_handler}> Update Item </button>
          </span>
          <button onClick={dropButtonHandler} className={styles.dropButton}>
            X
          </button>
        </div>
      </div>
    </div>
  )
}

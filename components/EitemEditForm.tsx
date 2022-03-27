import { Dispatch, SetStateAction, useState } from 'react'
import { Eitem } from '../pages/minus'
import styles from '../styles/Home.module.css'

type editEitemArgs = {
  itemToEdit: Eitem
  setEitems: Dispatch<SetStateAction<Eitem[]>>
  setCurrEitem: Dispatch<SetStateAction<number>>
}

export default function EitemEditForm(arg: editEitemArgs) {
  const [eName, setEitem] = useState(arg.itemToEdit.name)
  const [eSymbol, setEsymbol] = useState(arg.itemToEdit.symbol)

  function upd_E_handler() {
    if (eName === '' || eSymbol === '') {
      alert('! empty field !')
      arg.setCurrEitem(0)
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
          arg.setCurrEitem(0)
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
              arg.setEitems(() => res.data)
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
    arg.setCurrEitem(0)
  }

  return (
    <div className={styles.newEeditForm}>
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
        <button onClick={upd_E_handler} className={styles.okButton}>
          Update Item
        </button>
        <button onClick={dropButtonHandler} className={styles.dropButton}>
          X
        </button>
      </div>
    </div>
  )
}

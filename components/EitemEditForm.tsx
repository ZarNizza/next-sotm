import { Dispatch, SetStateAction, useState } from 'react'
import { Eitem } from '../pages/minus'
import stylesH from '../styles/Home.module.css'
import styles from './Select.module.scss'
import { AppContext } from './AppContext'
import { useContext } from 'react'

type editEitemArgs = {
  itemToEdit: Eitem
  setItems: Dispatch<SetStateAction<Eitem[]>>
  setCurrItem: Dispatch<SetStateAction<number>>
}

export default function EitemEditForm(arg: editEitemArgs) {
  const c = useContext(AppContext)
  const [eName, setEitem] = useState(arg.itemToEdit.name)
  const [eSymbol, setEsymbol] = useState(arg.itemToEdit.symbol)
  const [ePrice, setEprice] = useState(arg.itemToEdit.price)

  function upd_E_handler() {
    if (eName === '' || eSymbol === '') {
      alert('! ' + c.t.emptyField + ' !')
      arg.setCurrItem(0)
      return
    }
    const eitem = {
      mode: 'edit',
      dbPrefix: c.u,
      name: eName,
      symbol: eSymbol,
      price: ePrice,
      id: arg.itemToEdit.id
    }
    fetch('/api/eitems', {
      method: 'POST',
      body: JSON.stringify(eitem)
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          alert(c.t.error + res.error)
        } else {
          console.log('newEitem = OK')
          setEitem('')
          setEsymbol('')
          setEprice(0)
          arg.setCurrItem(0)
        }
      })
      .then(() => {
        fetch('/api/eitems', {
          method: 'POST',
          body: JSON.stringify({ mode: 'get', dbPrefix: c.u })
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.error) {
              alert('! get E after Update\n' + c.t.error + res.error)
            } else {
              console.log('newEitem reInit = OK')
              arg.setItems(() => res.data)
              localStorage.setItem(c.u + 'eitems', JSON.stringify(res.data))
            }
          })
      })
      .catch((error) =>
        alert('! final catch E after Update\n' + c.t.error + error.message)
      )
  }

  function input_Ename_ChHandler(eName: string) {
    setEitem(eName.replace(/[^a-zA-Zа-яА-Я\d\s\-\+\.\,\:\_]/gi, ''))
  }

  function input_Esymbol_ChHandler(eSymbol: string) {
    setEsymbol(eSymbol.replace(/[^a-zA-Zа-яА-Я\d\s\-\+\.\,\:\_]/gi, ''))
  }

  function input_Eprice_ChHandler(ePrice: string) {
    setEprice(Number(ePrice.replace(/[^\d\.\,]/gi, '')))
  }

  function dropButtonHandler() {
    arg.setCurrItem(0)
  }

  return (
    <div className={styles.floatWrapper}>
      <div className={styles.newEeditForm}>
        <p className={styles.title}>{c.t.edit}</p>
        <p>
          <input
            id="eInput"
            value={eName}
            onChange={(event) => input_Ename_ChHandler(event.target.value)}
            placeholder={c.t.descr}
            pattern="[a-zA-Zа-яА-Я\d\s\-\+\.,:_]*"
            className={styles.inputE}
          />
        </p>
        <p>
          <input
            id="eSymbolInput"
            value={eSymbol}
            onChange={(event) => input_Esymbol_ChHandler(event.target.value)}
            placeholder={c.t.shrtNam}
            pattern="[a-zA-Zа-яА-Я\d\s\-\+\.,:_]*"
            className={styles.inputE}
          />
        </p>
        <p>
          <input
            id="ePriceInput"
            value={String(ePrice)}
            onChange={(event) => input_Eprice_ChHandler(event.target.value)}
            placeholder="123.."
            pattern="[\d\.,]*"
            className={styles.inputE}
          />
        </p>
        <p className={styles.flexRow}>
          <button onClick={upd_E_handler} className={stylesH.sysButton}>
            <b>{c.t.update}</b>
          </button>
          <button onClick={dropButtonHandler} className={stylesH.sysButton}>
            {c.t.cancel}
          </button>
        </p>
      </div>
    </div>
  )
}

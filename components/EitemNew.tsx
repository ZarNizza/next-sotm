import { Dispatch, SetStateAction, useState } from 'react'
import { Eitem } from '../pages/minus'
import stylesH from '../styles/Home.module.css'
import styles from './Select.module.scss'
import { AppContext } from './AppContext'
import { useContext } from 'react'

type newEitemArgs = {
  setItems: Dispatch<SetStateAction<Eitem[]>>
  setNewFlag: Dispatch<SetStateAction<boolean>>
  setCurrItem?: Dispatch<SetStateAction<number>>
}

export default function EitemNew(arg: newEitemArgs) {
  const c = useContext(AppContext)
  const [eItem, setEitem] = useState('')
  const [eSymbol, setEsymbol] = useState('')
  const [ePrice, setEprice] = useState(0)
  if (!!arg.setCurrItem) arg.setCurrItem(() => 0)

  function add_E_handler() {
    if (eItem === '' || eSymbol === '') {
      alert('! ' + c.t.emptyField + ' !')
      arg.setNewFlag(false)
      return
    }
    const eitem = {
      mode: 'new',
      dbPrefix: c.u,
      name: eItem,
      symbol: eSymbol,
      price: ePrice
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
          console.log('newEitem = OK', res)
          setEitem('')
          setEsymbol('')
          setEprice(0)
          arg.setNewFlag(false)
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
              alert('! get E after New\n' + c.t.error + res.error)
            } else {
              console.log('newEitem reInit = OK', res)
              arg.setItems(() => res.data)
              localStorage.setItem(c.u + 'eitems', JSON.stringify(res.data))
            }
          })
      })
      .catch((error) => {
        console.log('! final catch E\n', c.t.error, error.message)
        alert('! final catch E after New\n' + c.t.error + error.message)
      })
  }

  function input_E_ChHandler(eName: string) {
    setEitem(eName.replace(/[^a-zA-Zа-яА-Я\d\s\-\+\.\,\:\_]/gi, ''))
  }

  function input_Esymbol_ChHandler(eSymbol: string) {
    setEsymbol(eSymbol.replace(/[^a-zA-Zа-яА-Я\d\s\-\+\.\,\:\_]/gi, ''))
  }

  function input_Eprice_ChHandler(ePrice: string) {
    setEprice(Number(ePrice.replace(/[^\d\.\,]/gi, '')))
  }

  function dropButtonHandler() {
    arg.setNewFlag(false)
  }

  return (
    <div className={styles.floatWrapper}>
      <div className={styles.newEeditForm}>
        <p className={styles.title}>
          {c.t.new} {c.t.xpense}
        </p>
        <p>
          <input
            id="eInput"
            value={eItem}
            onChange={(event) => input_E_ChHandler(event.target.value)}
            placeholder={c.t.descr}
            pattern="[a-zA-Zа-яА-Я\d\s\-\+\.,:_]*"
            className={styles.inputP}
          />
        </p>
        <p>
          <input
            id="eSymbolInput"
            value={eSymbol}
            onChange={(event) => input_Esymbol_ChHandler(event.target.value)}
            placeholder={c.t.shrtNam}
            pattern="[a-zA-Zа-яА-Я\d\s\-\+\.,:_]*"
            className={styles.inputP}
          />
        </p>
        <p>
          <input
            id="ePriceInput"
            value={ePrice}
            onChange={(event) => input_Eprice_ChHandler(event.target.value)}
            placeholder="123.."
            pattern="[\d\.,]*"
            className={styles.inputP}
          />
        </p>
        <p className={styles.flexRow}>
          <button onClick={add_E_handler} className={stylesH.sysButton}>
            <b>{c.t.save}</b>
          </button>
          <button onClick={dropButtonHandler} className={stylesH.sysButton}>
            {c.t.cancel}
          </button>
        </p>
      </div>
    </div>
  )
}

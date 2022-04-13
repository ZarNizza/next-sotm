import { Dispatch, SetStateAction, useState } from 'react'
import { Product } from '../pages/plus'
import stylesH from '../styles/Home.module.css'
import styles from './Select.module.scss'
import { AppContext } from './AppContext'
import { useContext } from 'react'

type editPitemArgs = {
  itemToEdit: Product
  setItems: Dispatch<SetStateAction<Product[]>>
  setCurrItem: Dispatch<SetStateAction<number>>
}

export default function ProductEditForm(arg: editPitemArgs) {
  const c = useContext(AppContext)
  const [pName, setPitem] = useState(arg.itemToEdit.name)
  const [pSymbol, setPsymbol] = useState(arg.itemToEdit.symbol)
  const [pPrice, setPprice] = useState(arg.itemToEdit.price)

  function upd_P_handler() {
    if (pName === '' || pSymbol === '') {
      alert('! empty field !')
      arg.setCurrItem(0)
      return
    }
    const pitem = {
      mode: 'edit',
      dbPrefix: c.u,
      name: pName,
      symbol: pSymbol,
      price: pPrice,
      id: arg.itemToEdit.id
    }
    fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify(pitem)
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          alert(c.t.error + res.error)
        } else {
          console.log('newPitem = OK')
          setPitem('')
          setPsymbol('')
          setPprice(0)
          arg.setCurrItem(0)
        }
      })
      .then(() => {
        fetch('/api/products', {
          method: 'POST',
          body: JSON.stringify({ mode: 'get', dbPrefix: c.u })
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.error) {
              alert('! get P after Update\n' + c.t.error + res.error)
            } else {
              console.log('newPitem reInit = OK')
              arg.setItems(() => res.data)
              localStorage.setItem(c.u + 'products', JSON.stringify(res.data))
            }
          })
      })
      .catch((error) =>
        alert('! final catch P after Update\n' + c.t.error + error.message)
      )
  }

  function input_Pname_ChHandler(pName: string) {
    setPitem(pName.replace(/[^a-zA-Zа-яА-Я\d\s\-\+\.\,\:\_]/gi, ''))
  }

  function input_Psymbol_ChHandler(pSymbol: string) {
    setPsymbol(pSymbol.replace(/[^a-zA-Zа-яА-Я\d\s\-\+\.\,\:\_]/gi, ''))
  }

  function input_Pprice_ChHandler(pPrice: string) {
    setPprice(Number(pPrice.replace(/[^\d\.\,]/gi, '')))
  }

  function dropButtonHandler() {
    arg.setCurrItem(0)
  }

  return (
    <div className={styles.floatWrapper}>
      <div className={styles.newPeditForm}>
        <p className={styles.title}>{c.t.edit}</p>
        <p>
          <input
            id="pInput"
            value={pName}
            onChange={(event) => input_Pname_ChHandler(event.target.value)}
            placeholder={c.t.descr}
            pattern="[a-zA-Zа-яА-Я\d\s\-\+\.,:_]*"
            className={styles.inputP}
          />
        </p>
        <p>
          <input
            id="pSymbolInput"
            value={pSymbol}
            onChange={(event) => input_Psymbol_ChHandler(event.target.value)}
            placeholder={c.t.shrtNam}
            pattern="[a-zA-Zа-яА-Я\d\s\-\+\.,:_]*"
            className={styles.inputP}
          />
        </p>
        <p>
          <input
            id="pPriceInput"
            value={String(pPrice)}
            onChange={(event) => input_Pprice_ChHandler(event.target.value)}
            placeholder="123.."
            pattern="[\d\.,]*"
            className={styles.inputP}
          />
        </p>
        <p className={styles.flexRow}>
          <button onClick={upd_P_handler} className={stylesH.sysButton}>
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

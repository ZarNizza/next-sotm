import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react'
import type { Sale } from '../pages/plus'
import styles from './CustomerSelect.module.scss'
import stylesH from '../styles/Home.module.css'

type SaleSelectProps = {
  sales: Sale[]
  setCurrentSale: Dispatch<SetStateAction<Sale>>
  currentSale: Sale
  setSale: Dispatch<SetStateAction<Sale[] | []>>
  mode: string
}

export default function SaleSelect(props: SaleSelectProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const saleInputRef = useRef<HTMLInputElement>(null)
  const [flagNewSale, setFlagNewSale] = useState('')
  const [newSdate, setNewSdate] = useState('')
  const [newScust, setNewScust] = useState('')
  const [newSprod, setNewSprod] = useState('')
  const [newSsum, setNewSsum] = useState('')

  function liveSearch(e: ChangeEvent<HTMLInputElement>) {
    const st = e.target.value.toLowerCase()
    setSearchTerm(() => st)
    props.setCurrentSale({ sid: 0, sdate: '', cust: 0, prod: 0, sum: 0 })
  }

  function liveST(e: ChangeEvent<HTMLSelectElement>) {
    const indexST = e.target.value
    const st = props.sales.filter((item: Sale) => {
      return item.sid === Number(indexST)
    })
    if (st.length === 1 && saleInputRef.current !== null) {
      const curr = st[0]
      saleInputRef.current.value = curr.sdate
      props.setCurrentSale({
        sid: Number(curr.sid),
        sdate: curr.sdate,
        cust: curr.cust,
        prod: curr.prod,
        sum: curr.sum
      })
    }
  }

  function dropButtonHandler() {
    setSearchTerm(() => '')
    if (saleInputRef.current !== null) saleInputRef.current.value = ''
    props.setCurrentSale({ sid: 0, sdate: '', cust: 0, prod: 0, sum: 0 })
  }

  function newButtonHandler() {
    setFlagNewSale(() => 'Y')
  }
  function saveNewHandler() {
    return new Promise((resolveSS, rejectSS) => {
      const body = {
        mode: 'new',
        sdate: newSdate,
        cust: newScust,
        prod: newSprod,
        sum: newSsum
      }
      fetch('/api/sales', {
        method: 'POST',
        body: JSON.stringify(body)
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            console.log('--- saveNew-S DB/api error: ' + res.error)
            alert('DataBase error: X3')
            rejectSS(res.error)
          } else {
            resolveSS(res)
          }
        })
        .catch((error) => {
          console.log('--- catch saveNew-S fetch error - ', error)
          alert('fetch data error: X3')
        })
    })
      .then(() => {
        new Promise((resolveUC, rejectUC) => {
          fetch('/api/sales')
            .then((apiRes) => apiRes.json())
            .then((apiRes) => {
              if (apiRes.error) {
                console.log('--- S-Select DB/api error: ' + apiRes.error)
                alert('DataBase error: X3')
                rejectUC(apiRes.error)
              } else {
                props.setSale(() => apiRes.data || [])
                resolveUC(apiRes)
              }
            })
            .catch((error) => {
              console.log('--- catch S-Select fetch error - ', error)
              alert('fetch data error: X3')
            })
        })
      })
      .then(() => {
        setNewSdate(() => '')
        setNewScust(() => '')
        setFlagNewSale(() => '')
      })
      .catch()
  }

  function cancelNewHandler() {
    setNewSdate(() => '')
    setNewScust(() => '')
    setFlagNewSale(() => '')
  }

  function CLSresList() {
    let cList = props.sales
      .filter((item: Sale) => {
        return (
          item.sdate.toLowerCase().includes(searchTerm) ||
          String(item.cust).includes(searchTerm) ||
          String(item.prod).includes(searchTerm)
        )
      })
      .map((item: Sale) => {
        return (
          <option value={item.sid} key={item.sid}>
            {item.sdate}, c={item.cust}, p={item.prod}, sum={item.sum}
          </option>
        )
      })
    return (
      <select onChange={liveST} size={4}>
        {cList}
      </select>
    )
  }

  return (
    <>
      <div className={styles.custList}>
        <p className={styles.title}>Sale</p>
        <button
          onClick={newButtonHandler}
          className={stylesH.plusButton}
          hidden={props.mode === 'stat'}
        >
          +New
        </button>
        <input
          type="search"
          ref={saleInputRef}
          placeholder="Search for a Sale"
          pattern="[a-zA-Zа-яА-Я\s\-]{1,50}"
          onChange={liveSearch}
          className={styles.inputCust}
        />
        <button onClick={dropButtonHandler} className={stylesH.dropButton}>
          X
        </button>
      </div>
      <div
        className={styles.floatWrapper}
        hidden={searchTerm === '' || !!props.currentSale.sid}
      >
        <div className={styles.custSelect}>
          <CLSresList />
        </div>
      </div>

      <div className={styles.floatWrapper} hidden={flagNewSale === ''}>
        <div className={styles.newCust}>
          <p className={styles.title}>New Sale</p>
          <p>
            <input
              type="text"
              className={styles.inputCust}
              placeholder="Date: 2022-02-22"
              pattern="[\d\-]{0,10}"
              value={newSdate}
              onChange={(event) =>
                setNewSdate(event.target.value.replace(/[^\-\d]/gi, ''))
              }
            />
          </p>
          <p>
            <input
              type="text"
              className={styles.inputCust}
              placeholder="Cust: xxxx"
              pattern="^[\d]{0,20}"
              value={newScust}
              onChange={(event) =>
                setNewScust(event.target.value.replace(/[^\d]/g, ''))
              }
            />
          </p>
          <p>
            <input
              type="text"
              className={styles.inputCust}
              placeholder="Prod: xxxx"
              pattern="^[\d]{0,20}"
              value={newSprod}
              onChange={(event) =>
                setNewSprod(event.target.value.replace(/[^\d]/g, ''))
              }
            />
          </p>
          <p>
            <input
              type="text"
              className={styles.inputCust}
              placeholder="Sum: xxxx"
              pattern="^[\d]{0,20}"
              value={newSsum}
              onChange={(event) =>
                setNewSsum(event.target.value.replace(/[^\d]/g, ''))
              }
            />
          </p>

          <p>
            <button onClick={saveNewHandler} className={stylesH.sysButton}>
              Save
            </button>
            <button onClick={cancelNewHandler} className={stylesH.sysButton}>
              Cancel
            </button>
          </p>
        </div>
      </div>
    </>
  )
}

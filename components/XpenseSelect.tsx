import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react'
import type { Xpense } from '../pages/minus'
import styles from './Select.module.scss'
import stylesH from '../styles/Home.module.css'

type XpenseSelectProps = {
  xpenses: Xpense[]
  setCurrentXpense: Dispatch<SetStateAction<Xpense>>
  currentXpense: Xpense
  setXpense: Dispatch<SetStateAction<Xpense[] | []>>
  mode: string
}

export default function XpenseSelect(props: XpenseSelectProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const xpenseInputRef = useRef<HTMLInputElement>(null)
  const [flagNewXpense, setFlagNewXpense] = useState('')
  const [newXdate, setNewXdate] = useState('')
  const [newXitem, setNewXitem] = useState('')
  const [newXsum, setNewXsum] = useState('')

  function liveSearch(e: ChangeEvent<HTMLInputElement>) {
    const st = e.target.value.toLowerCase()
    setSearchTerm(() => st)
    props.setCurrentXpense({ id: 0, date: '', xitem: 0, sum: 0 })
  }

  function liveST(e: ChangeEvent<HTMLSelectElement>) {
    const indexST = e.target.value
    const st = props.xpenses.filter((item: Xpense) => {
      return item.id === Number(indexST)
    })
    if (st.length === 1 && xpenseInputRef.current !== null) {
      const curr = st[0]
      xpenseInputRef.current.value = curr.date
      props.setCurrentXpense({
        id: Number(curr.id),
        date: curr.date,
        xitem: curr.xitem,
        sum: curr.sum
      })
    }
  }

  function dropButtonHandler() {
    setSearchTerm(() => '')
    if (xpenseInputRef.current !== null) xpenseInputRef.current.value = ''
    props.setCurrentXpense({ id: 0, date: '', xitem: 0, sum: 0 })
  }

  function newButtonHandler() {
    setFlagNewXpense(() => 'Y')
  }
  function saveNewHandler() {
    return new Promise((resolveSS, rejectSS) => {
      const body = {
        mode: 'new',
        date: newXdate,
        xitem: newXitem,
        sum: newXsum
      }
      fetch('/api/xpenses', {
        method: 'POST',
        body: JSON.stringify(body)
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            console.log('--- saveNew-X DB/api error: ' + res.error)
            alert('DataBase error: X3')
            rejectSS(res.error)
          } else {
            resolveSS(res)
          }
        })
        .catch((error) => {
          console.log('--- catch saveNew-X fetch error - ', error)
          alert('fetch data error: X3')
        })
    })
      .then(() => {
        new Promise((resolveUC, rejectUC) => {
          fetch('/api/xpenses')
            .then((apiRes) => apiRes.json())
            .then((apiRes) => {
              if (apiRes.error) {
                console.log('--- X-Select DB/api error: ' + apiRes.error)
                alert('DataBase error: X3')
                rejectUC(apiRes.error)
              } else {
                props.setXpense(() => apiRes.data || [])
                resolveUC(apiRes)
              }
            })
            .catch((error) => {
              console.log('--- catch X-Select fetch error - ', error)
              alert('fetch data error: X3')
            })
        })
      })
      .then(() => {
        setNewXdate(() => '')
        setNewXitem(() => '')
        setFlagNewXpense(() => '')
      })
      .catch()
  }

  function cancelNewHandler() {
    setNewXdate(() => '')
    setNewXitem(() => '')
    setFlagNewXpense(() => '')
  }

  function CLSresList() {
    let cList = props.xpenses
      .filter((item: Xpense) => {
        return (
          item.date.toLowerCase().includes(searchTerm) ||
          String(item.xitem).includes(searchTerm) ||
          String(item.id).includes(searchTerm)
        )
      })
      .map((item: Xpense) => {
        return (
          <option value={item.id} key={item.id}>
            {item.date}, i={item.xitem}, sum={item.sum}
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
        {/* <p className={styles.title}>Xpense</p> */}
        <input
          type="search"
          ref={xpenseInputRef}
          placeholder="Search for a Xpense"
          pattern="[a-zA-Zа-яА-Я\s\-\+]{1,50}"
          onChange={liveSearch}
          className={styles.inputCust}
        />
        <button
          onClick={newButtonHandler}
          className={stylesH.plusButton}
          hidden={props.mode === 'stat'}
        >
          +New
        </button>
        <button onClick={dropButtonHandler} className={stylesH.dropButton}>
          X
        </button>
      </div>
      <div
        className={styles.floatWrapper}
        hidden={searchTerm === '' || !!props.currentXpense.id}
      >
        <div className={styles.custSelect}>
          <CLSresList />
        </div>
      </div>

      <div className={styles.floatWrapper} hidden={flagNewXpense === ''}>
        <div className={styles.newCust}>
          <p className={styles.title}>New Xpense</p>
          <p>
            Date:
            <input
              type="text"
              className={styles.inputCust}
              placeholder="2022-02-22"
              pattern="[\d\-]{0,10}"
              value={newXdate}
              onChange={(event) =>
                setNewXdate(event.target.value.replace(/[^\-\d]/gi, ''))
              }
            />
          </p>
          <p>
            Xitem:
            <input
              type="text"
              className={styles.inputCust}
              placeholder="xxxx"
              pattern="^[\d]{0,20}"
              value={newXitem}
              onChange={(event) =>
                setNewXitem(event.target.value.replace(/[^\d]/g, ''))
              }
            />
          </p>
          <p>
            Sum:
            <input
              type="text"
              className={styles.inputCust}
              placeholder="xxxx"
              pattern="^[\d]{0,20}"
              value={newXsum}
              onChange={(event) =>
                setNewXsum(event.target.value.replace(/[^\d]/g, ''))
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
